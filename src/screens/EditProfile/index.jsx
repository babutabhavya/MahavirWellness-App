import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeadingWithBack} from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import EditProfileForm from '../../forms/EditProfileForm';

const styles = StyleSheet.create({
  subContainer: {margin: 20},
});

export default function EditProfile() {
  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Edit Profile</HeadingWithBack>
        <View style={{marginTop: 20}}>
          <EditProfileForm />
        </View>
      </View>
    </BaseContainer>
  );
}
