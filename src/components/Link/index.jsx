import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import {isFunction} from 'lodash';

const styles = StyleSheet.create({
  icon: {width: 20, height: 20, marginRight: 10},
  containerStyle: {flexDirection: 'row'},
  textStyle: {fontSize: 16},
});

export default function Link({
  to,
  onPress,
  children,
  icon,
  style = {},
  textStyle = {},
  params = {},
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isFunction(onPress)) {
          onPress();
        } else if (to) {
          navigation.navigate(to, params);
        }
      }}
      style={[style, styles.containerStyle]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.textStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}
