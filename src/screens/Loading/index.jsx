import React from 'react';
import BaseContainer from '../../containers/BaseContainer';
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <BaseContainer style={{justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../../../assets/loader.json')}
        style={{width: '100%', height: 400}}
        autoPlay
        loop
      />
    </BaseContainer>
  );
}
