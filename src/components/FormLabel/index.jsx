import React from 'react';
import Text from '../Text';
import DEFAULT_STYLES from '../../../styles';

export default function FormLabel({children, style = {}}) {
  return (
    <Text style={[DEFAULT_STYLES.text, {marginBottom: '2.5%'}, style]}>
      {children}
    </Text>
  );
}
