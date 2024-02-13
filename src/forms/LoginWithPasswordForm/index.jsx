import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Buttons';
import {validateEmail, validatePassword} from '../../validations'; // Assuming you have validation functions for email and password
import Label from '../../components/Label';
import {getAPIErrorMessage} from '../../utils';
import Error from '../../components/Error';
import Link from '../../components/Link';
import Text from '../../components/Text';
import {useAuth} from '../../hooks/auth';
import DEFAULT_STYLES from '../../../styles';

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

export default function LoginWithPasswordForm() {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {loginWithEmail} = useAuth();

  useEffect(() => {
    setError({});
  }, [email, password]);

  const handleLogin = () =>
    loginWithEmail({email, password}).catch(err => {
      setError({...error, detail: getAPIErrorMessage(err)});
      setSubmitting(false);
    });

  const validate = () => {
    setError({});
    var newError = {...error};
    if (!validateEmail(email)) {
      newError.email = 'Please enter a valid email address';
    }
    if (!validatePassword(password)) {
      newError.password = 'Please enter a valid password';
    }
    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const submit = () => {
    setSubmitting(true);
    if (validate()) {
      handleLogin();
    } else {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Label>Email</Label>
      <TextInput
        keyboardType="email-address"
        error={error.email}
        value={email}
        onChange={setEmail}
        inputProps={{autoCapitalize: false}}
      />
      <Label>Password</Label>
      <TextInput
        secureTextEntry
        error={error.password}
        value={password}
        onChange={setPassword}
      />
      {error.detail && (
        <View style={{marginBottom: 20}}>
          <Error centered>{error.detail}</Error>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={submit} loading={submitting}>
          SUBMIT
        </Button>
      </View>
      <Link
        style={{
          ...DEFAULT_STYLES.outlineButton,
          width: '100%',
          marginLeft: 4.5,
          marginTop: 20,
        }}
        textStyle={{
          fontSize: 16,
        }}
        onPress={() => navigation.navigate('ForgotPassword')}>
        FORGOT PASSWORD?
      </Link>
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
        onPress={() => navigation.navigate('Login')}>
        Login with OTP
      </Link>
    </View>
  );
}
