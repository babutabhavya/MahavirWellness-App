import LottieView from 'lottie-react-native';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {View} from 'react-native';

export default function EmptyContainer({data, emptyHelp, children}) {
  return isEmpty(data) ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <LottieView
        source={require('../../../assets/empty.json')}
        style={{width: '100%', height: 400}}
        autoPlay
        loop
      />
      {emptyHelp}
    </View>
  ) : (
    children
  );
}
