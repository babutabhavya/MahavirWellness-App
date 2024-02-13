import React from 'react';
import {View, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import LoginForm from '../../forms/LoginForm';
import BaseContainer from '../../containers/BaseContainer';
import Link from '../../components/Link';
import {useNavigation} from '@react-navigation/core';
import DEFAULT_STYLES from '../../../styles';

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <BaseContainer style={styles.container}>
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Heading level="1" style={styles.heading}>
            LOGIN
          </Heading>
          <LoginForm />
        </View>
        <View style={{flex: 0.1, justifyContent: 'flex-end', marginBottom: 40}}>
          <View style={DEFAULT_STYLES.center}>
            <Heading level={6}>New to Mahavir Wellness?</Heading>
            <Link
              style={{
                ...DEFAULT_STYLES.outlineButton,
                width: '100%',
                marginLeft: 4.5,
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('Signup')}>
              CREATE AN ACCOUNT
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
  heading: {marginBottom: '15%', textAlign: 'center'},
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 200,
    alignContent: 'center',
  },
});

export default LoginScreen;
