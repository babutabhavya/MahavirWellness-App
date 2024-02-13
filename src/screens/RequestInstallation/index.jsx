import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeadingWithBack} from '../../components/Heading';
import RequestInstallationForm from '../../forms/RequestInstallationForm';
import BaseContainer from '../../containers/BaseContainer';

const styles = StyleSheet.create({
  container: {flex: 1},
  subContainer: {margin: 20},
});

export default function RequestInstallation(props) {
  const {params} = props.route;
  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Request Installation</HeadingWithBack>
        <RequestInstallationForm params={params} />
      </View>
    </BaseContainer>
  );
}
