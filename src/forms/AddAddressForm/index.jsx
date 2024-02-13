import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import TextInput from '../../components/TextInput';
import Label from '../../components/Label';
import Button from '../../components/Buttons';
import OptionalText from '../../components/OptionalText';
import {useAddressContext} from '../../hooks/address';
import {useNavigation} from '@react-navigation/native';
import {getAPIErrorMessage} from '../../utils';

const AddressForm = ({address}) => {
  const navigation = useNavigation();
  const {createAddress, updateAddress} = useAddressContext();
  const [contactPersonName, setContactPersonName] = useState('');
  const [altContactNumber, setAltContactNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Define error state for each field
  const [errors, setErrors] = useState({
    contactPersonName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    // Check if address is present and set state fields accordingly
    if (address) {
      setContactPersonName(address.contact_person_name || '');
      setAltContactNumber(address.contact_person_number || '');
      setAddressLine1(address.address_line_1 || '');
      setAddressLine2(address.address_line_2 || '');
      setCity(address.city || '');
      setState(address.state || '');
      setPincode(address.pincode || '');
    }
  }, [address]);

  const validateForm = () => {
    const newErrors = {};

    if (!contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact Person Name is required';
    }

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }

    if (!addressLine2.trim()) {
      newErrors.addressLine2 = 'Address Line 2 is required';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setSubmitting(true);
    if (validateForm()) {
      const payload = {
        contact_person_name: contactPersonName,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city,
        state,
        contact_person_number: altContactNumber,
        pincode,
      };
      (address ? updateAddress(address.id, payload) : createAddress(payload))
        .then(() => setSubmitting(false))
        .then(() => navigation.goBack())
        .catch(error => {
          console.log(getAPIErrorMessage(error));
        });
    }
  };

  return (
    <>
      <Label>Contact Person Name*</Label>
      <TextInput
        onChange={setContactPersonName}
        value={contactPersonName}
        error={errors.contactPersonName} // Pass the error as a prop
      />
      <Label>
        Contact Number <OptionalText />
      </Label>
      <TextInput
        onChange={setAltContactNumber}
        value={altContactNumber}
        maxLength={10}
      />
      <Label>Address Line 1*</Label>
      <TextInput
        onChange={setAddressLine1}
        value={addressLine1}
        error={errors.addressLine1} // Pass the error as a prop
      />
      <Label>Address Line 2*</Label>
      <TextInput
        onChange={setAddressLine2}
        value={addressLine2}
        error={errors.addressLine2} // Pass the error as a prop
      />
      <Label>City*</Label>
      <TextInput onChange={setCity} value={city} error={errors.city} />
      <Label>State*</Label>
      <TextInput onChange={setState} value={state} error={errors.state} />
      <Label>Pincode*</Label>
      <TextInput
        onChange={setPincode}
        value={pincode}
        keyboardType="numeric"
        error={errors.pincode} // Pass the error as a prop
        maxLength={6}
      />
      <View style={{marginTop: 20}}>
        <Button onPress={handleSave} loading={submitting}>
          SAVE
        </Button>
      </View>
    </>
  );
};

export default AddressForm;
