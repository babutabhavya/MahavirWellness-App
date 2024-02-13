import React from 'react';
import BaseContainer from '../../containers/BaseContainer';
import {StyleSheet, View} from 'react-native';
import {HeadingWithBack} from '../../components/Heading';
import AddNewMyDeviceForm from '../../forms/AddNewMyDeviceForm';

const styles = StyleSheet.create({
  subContainer: {margin: 20},
});

export default function AddNewMyDevice() {
  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Add a New Device</HeadingWithBack>
        <AddNewMyDeviceForm />
      </View>
    </BaseContainer>
  );
}
