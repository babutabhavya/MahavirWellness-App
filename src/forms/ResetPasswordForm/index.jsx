import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Buttons';
import {validatePassword} from '../../validations'; // Assuming you have validation function for password
import Label from '../../components/Label';
import Error from '../../components/Error';
import {useAuth} from '../../hooks/auth';
import {getAPIErrorMessage} from '../../utils';

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
  const [error, setError] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {resetPassword} = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    setError({});
  }, [newPassword, oldPassword, confirmNewPassword]);

  const validate = () => {
    var newError = {...error};

    // Validate old password
    if (!oldPassword.trim()) {
      newError.oldPassword = 'Please enter your old password';
    }

    // Validate new password
    if (!validatePassword(newPassword)) {
      newError.newPassword = 'Please enter a valid new password';
    }

    // Validate confirm new password
    if (newPassword !== confirmNewPassword) {
      newError.confirmNewPassword = 'Passwords do not match';
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    resetPassword(oldPassword, newPassword)
      .then(() => navigation.goBack())
      .catch(err => {
        setError({...error, detail: getAPIErrorMessage(err)});
        setSubmitting(false);
      });
  };

  const submit = () => {
    setSubmitting(true);
    if (validate()) {
      handleSubmit();
    } else {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Label>Old Password</Label>
      <TextInput
        secureTextEntry
        error={error.oldPassword}
        value={oldPassword}
        onChange={setOldPassword}
      />
      <Label>New Password</Label>
      <TextInput
        secureTextEntry
        error={error.newPassword}
        value={newPassword}
        onChange={setNewPassword}
      />
      <Label>Confirm New Password</Label>
      <TextInput
        secureTextEntry
        error={error.confirmNewPassword}
        value={confirmNewPassword}
        onChange={setConfirmNewPassword}
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
    </View>
  );
}
