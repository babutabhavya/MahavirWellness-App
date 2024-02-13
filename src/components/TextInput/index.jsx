import React from 'react';
import {Surface} from 'react-native-paper';
import {Image, TextInput as RNTextInput, View} from 'react-native';
import DEFAULT_STYLES from '../../../styles';
import Error from '../Error';

export default function TextInput({
  value,
  onChange,
  placeholder,
  icon,
  maxLength,
  error,
  secureTextEntry = false,
  containerStyle = {},
  errorCentered = false,
  keyboardType = 'default',
  inputProps = {},
}) {
  return (
    <View style={[{marginBottom: 20}, containerStyle]}>
      <Surface
        elevation={5}
        style={[
          DEFAULT_STYLES.textInputContainer,
          inputProps.multiline ? {borderRadius: 10, paddingVertical: 10} : {},
        ]}>
        <RNTextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...inputProps}
          secureTextEntry={secureTextEntry}
          style={[
            DEFAULT_STYLES.textInput,
            {paddingRight: icon ? 40 : 0},
            inputProps.multiline ? {height: 100} : {},
          ]}
        />
        {icon && (
          <View
            style={[DEFAULT_STYLES.textInputIconContainer, {marginRight: 20}]}>
            <Image source={icon} style={DEFAULT_STYLES.textInputIcon} />
          </View>
        )}
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
