import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {Platform, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Buttons';
import {validatePhoneNumber} from '../../validations';
import Api from '../../api';
import Label from '../../components/Label';
import {getAPIErrorMessage} from '../../utils';
import Error from '../../components/Error';
import Link from '../../components/Link';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {width: '100%', alignSelf: 'center', marginTop: 10},
  heading: {marginBottom: '15%', textAlign: 'center'},
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 200,
  },
});

export default function ForgotPasswordForm() {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [useEmail, setUseEmail] = useState(false);

  const handleSetError = (val, key) => {
    setError({...error, [key]: val});
    setSubmitting(false);
  };

  useEffect(() => {
    setError({});
  }, [phone]);

  const handleLogin = () =>
    Api.post('user/login/otp/', {destination: phone}).then(result => {
      setSubmitting(false);
      navigation.navigate('OTP', {isLogin: true, phone});
    });

  const handleRequestOtp = () => {
    setSubmitting(true);
    if (!validatePhoneNumber(phone)) {
      handleSetError('Please enter a valid phone number', 'phone');
      return;
    }
    handleLogin().catch(err => {
      setError({detail: getAPIErrorMessage(err)});
      setSubmitting(false);
    });
  };

  return (
    <View>
      {useEmail ? (
        <>
          <Label>Email</Label>
          <TextInput
            keyboardType="email-address"
            error={error.email}
            value={email}
            onChange={setEmail}
          />
        </>
      ) : (
        <>
          <Label>Phone Number</Label>
          <TextInput
            maxLength={10}
            keyboardType="phone-pad"
            error={error.phone}
            value={phone}
            onChange={setPhone}
          />
        </>
      )}
      {error.detail && (
        <View style={{marginBottom: 20}}>
          <Error centered>{error.detail}</Error>
        </View>
      )}
      <Link
        style={{alignItems: 'center', justifyContent: 'center'}}
        textStyle={{
          textDecorationLine: 'underline',
          ...(Platform.OS === 'ios'
            ? {fontWeight: 'bold'}
            : {fontFamily: 'Montserrat-Bold'}),
        }}
        onPress={() => setUseEmail(!useEmail)}>
        Use {useEmail ? 'Phone Number' : 'Email'}
      </Link>
      {error.detail && (
        <View style={{marginBottom: 20}}>
          <Error centered>{error.detail}</Error>
        </View>
      )}
      <View style={[styles.buttonContainer, {marginTop: 25}]}>
        <Button onPress={handleRequestOtp} loading={submitting}>
          SUBMIT
        </Button>
      </View>
    </View>
  );
}
