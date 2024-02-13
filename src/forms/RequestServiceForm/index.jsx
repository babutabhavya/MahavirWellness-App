import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BARCODE_ICON from '../../../assets/icons/serialnumber.png';
import DatePicker from '../../components/DatePicker';
import Link from '../../components/Link';
import Label from '../../components/Label';
import Button from '../../components/Buttons';
import {useBottomSheet} from '../../hooks/bottomSheet';
import Heading from '../../components/Heading';
import TouchableInput from '../../components/TouchableInput';
import {Surface} from 'react-native-paper';
import {SERVICE_PROBLEMS} from '../../constants/serviceProblems';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import DEFAULT_STYLES from '../../../styles';
import ListProducts from '../../components/ListProducts';
import PreferredTime from '../../components/PreferredTime';
import ListAddresses from '../../components/ListAddresses';
import AddressCard from '../../components/AddressCard';
import {useNavigation} from '@react-navigation/native';
import Error from '../../components/Error';
import DateParser from '../../utils/date-parser';
import ServiceClient from '../../api/requests/service';
import PROBLEM_ICON from '../../../assets/icons/problem.png';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  submit: {marginTop: 30},
  listProductsHeading: {marginBottom: 20},
  flatListItemSurface: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  flatListItemContentContainer: {marginHorizontal: 20, paddingBottom: 40},
  link: {...DEFAULT_STYLES.outlineButton, marginTop: 10},
  productCodeStyle: {fontSize: 12, marginTop: 10},
});

function ListPreferredTime({selected, onSelect}) {
  const OPTIONS = [
    {title: 'Morning (9AM-12PM)', value: 'Morning (9AM-12PM)'},
    {title: 'Afternoon (12PM - 4PM)', value: 'Afternoon (12PM - 4PM)'},
    {title: 'Evening (4PM - 9PM)', value: 'Evening (4PM - 9PM)'},
  ];
  return (
    <BottomSheetFlatList
      contentContainerStyle={styles.flatListItemContentContainer}
      data={OPTIONS}
      ListHeaderComponent={
        <Heading level={5} style={styles.listProductsHeading}>
          Select Your Preferred Time*
        </Heading>
      }
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Surface
            style={[
              styles.flatListItemSurface,
              selected && selected.value === item.value
                ? {borderColor: 'black', borderWidth: 5}
                : {},
            ]}>
            <Heading level={7}>{item.title}</Heading>
          </Surface>
        </TouchableOpacity>
      )}
    />
  );
}

function ListProblems({selected, onSelect}) {
  return (
    <BottomSheetFlatList
      contentContainerStyle={styles.flatListItemContentContainer}
      ListHeaderComponent={
        <Heading level={5} style={styles.listProductsHeading}>
          Select the problem you are facing*
        </Heading>
      }
      data={SERVICE_PROBLEMS}
      keyExtractor={(item, index) => `${index}-${item.title}`}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Surface
            style={[
              styles.flatListItemSurface,
              selected && selected.value === item.value
                ? {borderColor: 'black', borderWidth: 5}
                : {},
            ]}>
            <Heading>{item.title}</Heading>
          </Surface>
        </TouchableOpacity>
      )}
    />
  );
}

export default function RequestServiceForm({params}) {
  const [product, setProduct] = useState();
  const {openBottomSheet, closeSheet} = useBottomSheet();
  const [problem, setProblem] = useState(undefined);
  const [preferredDate, setPreferredDate] = useState(undefined);
  const [preferredTime, setPreferredTime] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (params && params.product) {
      setProduct(params.product);
    }
  }, []);

  // useEffect to clear errors for each state attribute
  useEffect(() => {
    if (errors.product && product) {
      // Clear the error for the product when it becomes valid
      setErrors(prevErrors => {
        const updatedErrors = {...prevErrors};
        delete updatedErrors.product;
        return updatedErrors;
      });
    }
  }, [product]);

  useEffect(() => {
    if (errors.problem && problem) {
      // Clear the error for the problem when it becomes valid
      setErrors(prevErrors => {
        const updatedErrors = {...prevErrors};
        delete updatedErrors.problem;
        return updatedErrors;
      });
    }
  }, [problem]);

  useEffect(() => {
    if (errors.preferredDate && preferredDate) {
      // Clear the error for preferredDate when it becomes valid
      setErrors(prevErrors => {
        const updatedErrors = {...prevErrors};
        delete updatedErrors.preferredDate;
        return updatedErrors;
      });
    }
  }, [preferredDate]);

  useEffect(() => {
    if (errors.preferredTime && preferredTime) {
      // Clear the error for preferredTime when it becomes valid
      setErrors(prevErrors => {
        const updatedErrors = {...prevErrors};
        delete updatedErrors.preferredTime;
        return updatedErrors;
      });
    }
  }, [preferredTime]);

  useEffect(() => {
    if (errors.address && address) {
      // Clear the error for address when it becomes valid
      setErrors(prevErrors => {
        const updatedErrors = {...prevErrors};
        delete updatedErrors.address;
        return updatedErrors;
      });
    }
  }, [address]);

  const validateForm = () => {
    const newErrors = {};

    if (!product) {
      newErrors.product = 'Please select a product.';
    }

    if (!problem) {
      newErrors.problem = 'Please select a problem.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }

    if (!preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time.';
    }

    if (!address) {
      newErrors.address = 'Please select an address or add a new one.';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        ...address,
        preferred_date: DateParser.format(preferredDate),
        preferred_time: preferredTime.value,
        product: product.id,
        problem: problem.value,
        serial_number:
          params && params.serialNumber ? params.serialNumber : undefined,
      };
      delete payload.id;
      delete payload.user;
      new ServiceClient()
        .create(payload)
        .then(() => setSubmitting(false))
        .then(() => navigation.goBack());
    }
  };

  const handleOpenSelectProduct = () =>
    openBottomSheet(
      <ListProducts
        onSelect={item => {
          setProduct(item);
          closeSheet();
        }}
        ListHeaderComponent={
          <Heading level={5} style={styles.listProductsHeading}>
            Select Product*
          </Heading>
        }
        my
        selected={product}
      />,
    );

  const handleOpenSelectProblem = () =>
    openBottomSheet(
      <ListProblems
        onSelect={item => {
          setProblem(item);
          closeSheet();
        }}
        selected={problem}
      />,
    );

  const handleOpenSelectPreferredTime = () =>
    openBottomSheet(
      <ListPreferredTime
        onSelect={item => {
          setPreferredTime(item);
          closeSheet();
        }}
        selected={preferredTime}
      />,
    );

  const handleOpenSelectAddress = () =>
    openBottomSheet(
      <View>
        <ListAddresses
          ListHeaderComponent={
            <Heading level={5} style={styles.listProductsHeading}>
              Select Address*
            </Heading>
          }
          onSelect={item => {
            setAddress(item);
            closeSheet();
          }}
          ListFooterComponent={
            <Button
              onPress={() => {
                closeSheet();
                navigation.navigate('AddAddress');
              }}>
              Add Address
            </Button>
          }
        />
      </View>,
    );

  return (
    <View>
      <Label>Select Product*</Label>
      <TouchableInput
        icon={BARCODE_ICON}
        onPress={handleOpenSelectProduct}
        error={errors.product}>
        <Text>{product ? product.title : ''}</Text>
      </TouchableInput>
      <Label>Problem*</Label>
      <TouchableInput
        icon={PROBLEM_ICON}
        onPress={handleOpenSelectProblem}
        error={errors.problem}>
        <Text>{problem ? problem.title : ''}</Text>
      </TouchableInput>
      <Label>Preferred Date*</Label>
      <DatePicker
        value={preferredDate}
        onChange={setPreferredDate}
        minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        error={errors.preferredDate}
      />
      <PreferredTime
        value={preferredTime}
        onPress={handleOpenSelectPreferredTime}
        error={errors.preferredTime}
      />
      <Label>Message</Label>
      <TextInput
        inputProps={{multiline: true}}
        value={message}
        onChange={setMessage}
      />
      {address && (
        <View style={{marginBottom: 20}}>
          <AddressCard address={address} noActions={true} />
        </View>
      )}
      <Link style={styles.link} onPress={handleOpenSelectAddress}>
        {address ? 'Change' : 'Select'} Address
      </Link>
      {errors.address && (
        <View style={{marginLeft: 10, marginTop: 7.5}}>
          <Error>{errors.address}</Error>
        </View>
      )}
      <View style={styles.submit}>
        <Button onPress={handleSubmit} loading={submitting}>
          SUBMIT
        </Button>
      </View>
    </View>
  );
}
