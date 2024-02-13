import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeadingWithBack} from '../../components/Heading';
import RequestServiceForm from '../../forms/RequestServiceForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BaseContainer from '../../containers/BaseContainer';

const styles = StyleSheet.create({
  subContainer: {margin: 20},
});

export default function RequestService(props) {
  const {params} = props.route;

  return (
    <BaseContainer>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.subContainer}>
          <HeadingWithBack>Request Service</HeadingWithBack>
          <RequestServiceForm params={params} />
        </View>
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
}
