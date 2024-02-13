import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Heading from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import Link from '../../components/Link';
import {useNavigation} from '@react-navigation/core';
import SignupForm from '../../forms/SignupForm';
import DEFAULT_STYLES from '../../../styles';

function SignupScreen() {
  const navigation = useNavigation();
  return (
    <BaseContainer style={styles.container}>
      <View style={styles.content}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.keyboardAvoidingView}>
          <View style={styles.formContainer}>
            <Heading level="1" style={styles.heading}>
              SIGNUP
            </Heading>
            <SignupForm />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.subContentContainer}>
          <View style={DEFAULT_STYLES.center}>
            <Heading level={6}>Already Have an Account?</Heading>
            <Link
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}>
              LOGIN
            </Link>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  subContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {paddingTop: 75},
  keyboardAvoidingView: {flex: 1},
  linkButton: {
    ...DEFAULT_STYLES.outlineButton,
    width: '100%',
    marginLeft: 4.5,
    marginTop: 10,
  },
  heading: {marginBottom: 40, textAlign: 'center'},
  content: {
    flex: 0.9,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 200,
    alignContent: 'center',
  },
});

export default SignupScreen;
