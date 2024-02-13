import React from 'react';
import {SafeAreaView} from 'react-native';
import DEFAULT_STYLES from '../../../styles';
import WebView from 'react-native-webview';

export default function TermsAndCondition() {
  return (
    <SafeAreaView style={DEFAULT_STYLES.baseContainer}>
      <WebView
        source={{
          uri: 'https://babutabhavya.github.io/mahavirwellness/Terms%20and%20Conditions.html',
        }}
        cacheEnabled
        startInLoadingState
      />
    </SafeAreaView>
  );
}
