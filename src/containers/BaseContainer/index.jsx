import React from 'react';
import {SafeAreaView} from 'react-native';
import DEFAULT_STYLES from '../../../styles';

export default function BaseContainer({children, style = {}}) {
  return (
    <SafeAreaView style={[DEFAULT_STYLES.baseContainer, style]}>
      {children}
    </SafeAreaView>
  );
}
