import React, {useEffect} from 'react';
import BaseContainer from '../../containers/BaseContainer';
import {View} from 'react-native';
import Button from '../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import ACTION_TYPES from '../../constants/actions';
import {CommonActions} from '@react-navigation/native';
import LOGO from '../../../assets/splash_icon.png';
import Image from '../../components/Image';

export default function WelcomeScreen({navigation}) {
  const dispatch = useDispatch();
  const isGuest = useSelector(state => state.authReducer.isGuest);

  useEffect(() => {
    if (isGuest === true) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoggedInRoute'}],
        }),
      );
    }
  }, [isGuest]);

  return (
    <BaseContainer>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <View
          style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={LOGO}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 0.5, justifyContent: 'space-evenly'}}>
          <Button onPress={() => dispatch({type: ACTION_TYPES.AUTH.GUEST})}>
            CONTINUE AS A GUEST
          </Button>
          <Button onPress={() => navigation.navigate('Login')}>LOGIN</Button>
          <Button onPress={() => navigation.navigate('Signup')}>
            CREATE AN ACCOUNT
          </Button>
        </View>
      </View>
    </BaseContainer>
  );
}
