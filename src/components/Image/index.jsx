import React from 'react';
import FastImage from 'react-native-fast-image';

export default function Image({source, style, ...props}) {
  return <FastImage source={source} style={[style]} {...props} />;
}
