import React from 'react';
import BaseContainer from '../BaseContainer';
import Button from '../../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import Heading from '../../components/Heading';
import {useSelector} from 'react-redux';

const EmptyAuth = () => {
  const navigation = useNavigation();
  return (
    <BaseContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Heading level={2} style={{textAlign: 'center'}}>
          Please log in to view this content.
        </Heading>
        <Button
          onPress={() => navigation.navigate('Onboarding', {screen: 'Login'})}>
          LOGIN
        </Button>
      </View>
    </BaseContainer>
  );
};

const AuthWrapper = WrappedComponent => {
  const Wrapper = props => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <EmptyAuth />;
    }
  };

  return Wrapper;
};

export default AuthWrapper;
