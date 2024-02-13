import React from 'react';
import {Text as RNText} from 'react-native-paper';
import styles from '../../../styles'; // Import the styles

const Text = ({children, style, ...props}) => {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
