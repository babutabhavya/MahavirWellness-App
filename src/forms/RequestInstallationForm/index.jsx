import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TextInput from '../../components/TextInput';
import BARCODE_ICON from '../../../assets/icons/serialnumber.png';
import PRODUCT_ICON from '../../../assets/icons/product.png';
import DatePicker from '../../components/DatePicker';
import Link from '../../components/Link';
import Label from '../../components/Label';
import Button from '../../components/Buttons';
import {useBottomSheet} from '../../hooks/bottomSheet';
import Heading from '../../components/Heading';
import TouchableInput from '../../components/TouchableInput';
import Text from '../../components/Text';
import DEFAULT_STYLES from '../../../styles';
import OptionalText from '../../components/OptionalText';
import PreferredTime, {ListPreferredTime} from '../../components/PreferredTime';
import ListProducts from '../../components/ListProducts';
import ListAddresses from '../../components/ListAddresses';
import AddressCard from '../../components/AddressCard';
import {useNavigation} from '@react-navigation/native';
import Error from '../../components/Error';
import DateParser from '../../utils/date-parser';
import InstallationRequestClient from '../../api/requests/installation';
import {getAPIErrorMessage} from '../../utils';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  link: {
    ...DEFAULT_STYLES.outlineButton,
    marginTop: 10,
  },
  submit: {marginTop: 30},
  listProductsHeading: {marginBottom: 20},
});

export default function RequestInstallationForm({params}) {
  const [product, setProduct] = useState(
    params && params.product ? params.product : undefined,
  );
  const [serialNumber, setSerialNumber] = useState(
    params && params.serialNumber ? params.serialNumber : '',
  );
  const [preferredDate, setPreferredDate] = useState(undefined);
  const [preferredTime, setPreferredTime] = useState(undefined);
  const {openBottomSheet, closeSheet} = useBottomSheet();
  const [address, setAddress] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

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
        serial_number: serialNumber,
        preferred_date: DateParser.format(preferredDate),
        preferred_time: preferredTime.value,
        product: product.id,
      };
      delete payload.id;
      delete payload.user;
      new InstallationRequestClient()
        .create(payload)
        .then(() => setSubmitting(false))
        .then(() => navigation.goBack())
        .catch(error => {
          const message = getAPIErrorMessage(error);
          console.log('Error message: ', error.response.data);
        });
    }
  };

  const handleOpenSelectProduct = () =>
    openBottomSheet(
      <ListProducts
        ListHeaderComponent={
          <Heading level={5} style={styles.listProductsHeading}>
            Select Product*
          </Heading>
        }
        onSelect={item => {
          setProduct(item);
          closeSheet();
        }}
        selected={product}
      />,
    );

  const handleOpenSelectPreferredTime = () =>
    openBottomSheet(
      <ListPreferredTime
        selected={preferredTime}
        onSelect={item => {
          setPreferredTime(item);
          closeSheet();
        }}
      />,
    );

  const handleOpenSelectAddress = () =>
    openBottomSheet(
      <ListAddresses
        Component={BottomSheetFlatList}
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
      />,
    );

  return (
    <View>
      <Label>Select Product*</Label>
      <TouchableInput
        icon={PRODUCT_ICON}
        onPress={handleOpenSelectProduct}
        error={errors.product}>
        <Text>{product ? product.title : ''}</Text>
      </TouchableInput>
      <Label>
        Serial Number <OptionalText />
      </Label>
      <TextInput
        icon={BARCODE_ICON}
        value={serialNumber}
        onChange={setSerialNumber}
        error={errors.serialNumber}
      />
      <Label>Preferred Date*</Label>
      <DatePicker
        value={preferredDate}
        onChange={setPreferredDate}
        minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        error={errors.preferredDate}
      />
      <PreferredTime
        onPress={handleOpenSelectPreferredTime}
        value={preferredTime}
        error={errors.preferredTime}
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
