import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Buttons';
import {validatePhoneNumber} from '../../validations';
import Label from '../../components/Label';
import {getAPIErrorMessage} from '../../utils';
import Error from '../../components/Error';
import Link from '../../components/Link';
import Text from '../../components/Text';
import {useAuth} from '../../hooks/auth';

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

export default function LoginForm() {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {sendOTP} = useAuth();

  const handleSetError = (val, key) => {
    setError({...error, [key]: val});
    setSubmitting(false);
  };

  useEffect(() => {
    setError({});
  }, [phone]);

  const handleLogin = () =>
    sendOTP(phone, () => {
      setSubmitting(false);
      navigation.navigate('OTP', {isLogin: true, phone});
    }).then(() => {});

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
      <Label>Phone Number</Label>
      <TextInput
        maxLength={10}
        keyboardType="phone-pad"
        error={error.phone}
        value={phone}
        onChange={setPhone}
      />
      {error.detail && (
        <View style={{marginBottom: 10}}>
          <Error centered>{error.detail}</Error>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={handleRequestOtp} loading={submitting}>
          REQUEST OTP
        </Button>
      </View>
      <Text style={{marginVertical: 20, textAlign: 'center'}}>OR</Text>
      <Link
        style={{
          marginLeft: 4.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        textStyle={{
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Montserrat-Bold',
          textDecorationLine: 'underline',
        }}
        onPress={() => navigation.navigate('LoginWithPassword')}>
        Login with Password
      </Link>
    </View>
  );
}
