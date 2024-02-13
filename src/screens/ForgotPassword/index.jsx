import React from 'react';
import {View, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import ForgotPasswordForm from '../../forms/ForgotPasswordForm';

function ForgotPasswordScreen() {
  return (
    <BaseContainer style={styles.container}>
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Heading level="1" style={styles.heading}>
            Forgot Password
          </Heading>
          <ForgotPasswordForm />
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
  heading: {marginBottom: '15%', textAlign: 'center'},
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 200,
    alignContent: 'center',
  },
});

export default ForgotPasswordScreen;
