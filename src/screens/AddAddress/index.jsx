import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeadingWithBack} from '../../components/Heading';
import AddressForm from '../../forms/AddAddressForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BaseContainer from '../../containers/BaseContainer';

const styles = StyleSheet.create({
  subContainer: {
    margin: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  heading: {marginVertical: 20, textAlign: 'center'},
});

export default function AddAddress(props) {
  const params = props.route.params;
  const address = params && params.address ? params.address : null;
  return (
    <BaseContainer>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.subContainer}>
          <HeadingWithBack>{address ? 'Edit' : 'Add'} Address</HeadingWithBack>
          <AddressForm address={address} />
        </View>
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
}
