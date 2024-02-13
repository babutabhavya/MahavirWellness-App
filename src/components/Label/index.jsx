import React from 'react';
import DEFAULT_STYLES from '../../../styles';
import Text from '../Text';

export default function Label({children, size = 'large', style = {}}) {
  return (
    <Text style={[DEFAULT_STYLES[`label${size}`], style]}>{children}</Text>
  );
}
