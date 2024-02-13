import React from 'react';
import {View} from 'react-native';
import DEFAULT_STYLES from '../../../styles';
import Text from '../Text';

export default function Error({
  children,
  containerStyle = {},
  centered = false,
}) {
  return (
    <View style={[DEFAULT_STYLES.error, containerStyle]}>
      <Text
        style={{
          color: 'red',
          fontSize: 12,
          textAlign: centered ? 'center' : 'left',
        }}>
        {children}
      </Text>
    </View>
  );
}
