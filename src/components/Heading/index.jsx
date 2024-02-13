// CustomHeading.js
import React from 'react';
import {Text as RNText, View} from 'react-native';
import DEFAULT_STYLES from '../../../styles';
import Back from '../Buttons/Back';

const Heading = ({level, children, style = {}, ...props}) => {
  const headingStyle = DEFAULT_STYLES[`heading${level}`];

  return (
    <RNText
      style={{...DEFAULT_STYLES.heading, ...headingStyle, ...style}}
      {...props}>
      {children}
    </RNText>
  );
};

export default Heading;

const HeadingWithBack = ({children, containerStyle, headingStyle}) => (
  <View
    style={[
      {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
      },
      containerStyle,
    ]}>
    <View style={{marginRight: 15}}>
      <Back />
    </View>
    <Heading level={5} style={headingStyle}>
      {children}
    </Heading>
  </View>
);

export {HeadingWithBack};
