import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import DEFAULT_STYLES from '../../../styles';
import {Surface} from 'react-native-paper';
import Error from '../Error';
import isFunction from 'lodash/isFunction';

export default function TouchableInput({
  onPress,
  icon,
  children,
  error,
  errorCentered,
  containerStyle = {},
}) {
  return (
    <View style={[{marginBottom: 20}, containerStyle]}>
      <Surface style={[DEFAULT_STYLES.textInputContainer]} elevation={5}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={isFunction(onPress) ? undefined : 1}
          style={[
            DEFAULT_STYLES.textInput,
            {paddingRight: icon ? 40 : 0},
            {justifyContent: 'center'},
          ]}>
          {children}
          {icon && (
            <View style={DEFAULT_STYLES.textInputIconContainer}>
              <Image source={icon} style={DEFAULT_STYLES.textInputIcon} />
            </View>
          )}
        </TouchableOpacity>
      </Surface>
      {error && (
        <Error
          containerStyle={{paddingLeft: 10, marginTop: 10}}
          centered={errorCentered}>
          {error}
        </Error>
      )}
    </View>
  );
}
