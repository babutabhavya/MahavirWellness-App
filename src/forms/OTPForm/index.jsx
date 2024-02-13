import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/Buttons';
import {validateOTP} from '../../validations';
import OTPTextView from 'react-native-otp-textinput';
import Error from '../../components/Error';
import {getAPIErrorMessage} from '../../utils';
import DEFAULT_STYLES from '../../../styles';
import {useAuth} from '../../hooks/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {width: '100%', alignSelf: 'center', marginTop: '5%'},
  heading: {marginBottom: '15%', textAlign: 'center'},
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 200,
  },
});

export default function OTPForm({phone, isLogin, isSignup, signupPayload}) {
  const [error, setError] = useState({});
  const [otp, setOTP] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {loginWithPhone, verifyMobileAndLogin} = useAuth();

  const handleSetError = (val, key) => {
    setError({...error, [key]: val});
    setSubmitting(false);
  };

  const handleLogin = () =>
    loginWithPhone({otp, phone}).catch(err => {
      handleSetError(getAPIErrorMessage(err), 'detail');
      setSubmitting(false);
    });

  const handleSignup = () =>
    verifyMobileAndLogin({...signupPayload, otp}).catch(err => {
      handleSetError(getAPIErrorMessage(err), 'detail');
      setSubmitting(false);
    });

  const handleRequestOtp = () => {
    setSubmitting(true);
    if (!validateOTP(otp)) {
      handleSetError('Please enter a valid OTP', 'otp');
      return;
    }
    if (isLogin) {
      handleLogin();
    }
    if (isSignup) {
      handleSignup();
    }
  };

  return (
    <>
      <OTPTextView
        handleTextChange={setOTP}
        tintColor="black"
        inputCount={6}
        containerStyle={{marginBottom: 20}}
        textInputStyle={{
          width: 20,
          fontFamily: DEFAULT_STYLES.heading.fontFamily,
          fontSize: 15,
        }}
      />
      {error && error.detail && <Error centered>{error.detail}</Error>}
      <View style={styles.buttonContainer}>
        <Button onPress={handleRequestOtp} loading={submitting}>
          SUBMIT
        </Button>
      </View>
    </>
  );
}
