import React from 'react';
import {Button as RNPButton} from 'react-native-paper';
import Text from '../Text';
import DEFAULT_STYLES from '../../../styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    height: 50,
    width: '100%',
    borderRadius: 200,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const Button = ({children, onPress, loading = false}) => {
  return (
    <RNPButton
      loading={loading}
      mode="elevated"
      onPress={onPress}
      style={styles.button}>
      {!loading && (
        <Text style={[DEFAULT_STYLES.buttonText, DEFAULT_STYLES.bold]}>
          {children}
        </Text>
      )}
    </RNPButton>
  );
};

export default Button;
