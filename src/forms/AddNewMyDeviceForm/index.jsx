import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import ListProducts from '../../components/ListProducts';
import Heading from '../../components/Heading';
import {useBottomSheet} from '../../hooks/bottomSheet';
import Label from '../../components/Label';
import TouchableInput from '../../components/TouchableInput';
import PRODUCT_ICON from '../../../assets/icons/product.png';
import TextInput from '../../components/TextInput';
import BARCODE_ICON from '../../../assets/icons/serialnumber.png';
import Button from '../../components/Buttons';
import MyDevicesClient from '../../api/my-devices';
import {useNavigation} from '@react-navigation/native';
import * as _ from 'lodash';
import Error from '../../components/Error';
import {getAPIErrorMessage} from '../../utils';

const styles = StyleSheet.create({
  submit: {marginTop: 30},
  listProductsHeading: {marginBottom: 20},
});

export default function AddNewMyDeviceForm() {
  const [product, setProduct] = useState(undefined);
  const [serialNumber, setSerialNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const {openBottomSheet, closeSheet} = useBottomSheet();
  const navigation = useNavigation();

  const validateForm = () => {
    const validationErrors = {};

    if (_.isUndefined(product)) {
      validationErrors.product = 'Product is required';
    }
    if (_.isEmpty(serialNumber)) {
      validationErrors.serialNumber = 'Serial Number is required';
    }

    return validationErrors;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const validationErrors = validateForm();
    if (_.isEmpty(validationErrors)) {
      new MyDevicesClient()
        .create({product: product.id, serial_number: serialNumber})
        .then(() => setSubmitting(false))
        .then(() => navigation.goBack())
        .catch(error => {
          const message = getAPIErrorMessage(error);
          setErrors({error: message});
          setSubmitting(false);
        });
    } else {
      setErrors(validationErrors);
      setSubmitting(false);
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
      <Label>Serial Number*</Label>
      <TextInput
        icon={BARCODE_ICON}
        value={serialNumber}
        onChange={setSerialNumber}
        error={errors.serialNumber}
      />
      {errors.error && <Error centered>{errors.error}</Error>}
      <View style={styles.submit}>
        <Button onPress={handleSubmit} loading={submitting}>
          SUBMIT
        </Button>
      </View>
    </View>
  );
}
