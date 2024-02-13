import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Buttons';
import {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
} from '../../validations';
import Label from '../../components/Label';
import {getAPIErrorMessage} from '../../utils';
import Error from '../../components/Error';
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
  errorContainer: {marginBottom: 20},
});

export default function SignupForm() {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {signupUser} = useAuth();

  useEffect(() => {
    setError({});
  }, [phone, name, email, password]);

  const handleInitiateSignup = () => {
    signupUser({mobile: phone, email, password, name}, () => {
      setSubmitting(false);
      navigation.navigate('OTP', {
        isSignup: true,
        signupPayload: {mobile: phone, email, password, name},
      });
    }).catch(err => {
      setError({detail: getAPIErrorMessage(err)});
      setSubmitting(false);
    });
  };

  const validate = () => {
    var newError = {...error};

    if (!name.trim()) {
      newError.name = 'Please enter your name';
    }

    if (!validateEmail(email)) {
      newError.email = 'Please enter a valid email address';
    }

    if (!validatePhoneNumber(phone)) {
      newError.phone = 'Please enter a valid phone number';
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
      handleInitiateSignup();
    } else {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Label>Name</Label>
      <TextInput error={error.name} value={name} onChange={setName} />
      <Label>Email</Label>
      <TextInput
        keyboardType="email-address"
        inputProps={{autoCapitalize: false}}
        error={error.email}
        value={email}
        onChange={setEmail}
      />
      <Label>Phone Number</Label>
      <TextInput
        keyboardType="phone-pad"
        error={error.phone}
        value={phone}
        onChange={setPhone}
      />
      <Label>Password</Label>
      <TextInput
        secureTextEntry
        error={error.password}
        value={password}
        onChange={setPassword}
      />
      {error.detail && (
        <View style={styles.errorContainer}>
          <Error centered>{error.detail}</Error>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={submit} loading={submitting}>
          SUBMIT
        </Button>
      </View>
    </View>
  );
}
