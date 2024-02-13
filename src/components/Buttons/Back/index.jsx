import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import ARROW_LEFT from '../../../../assets/icons/arrow-left.png';
import {useNavigation} from '@react-navigation/native';
import DEFAULT_STYLES from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    ...DEFAULT_STYLES.shadow,
    backgroundColor: 'white',
    width: 30,
    height: 30,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  icon: {width: '55%', height: '55%'},
});

export default function Back() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={handleBack} style={styles.container}>
      <Image source={ARROW_LEFT} style={styles.icon} />
    </TouchableOpacity>
  );
}
