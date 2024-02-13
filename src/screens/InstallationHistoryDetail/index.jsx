import React, {useEffect, useState} from 'react';
import BaseContainer from '../../containers/BaseContainer';
import {StyleSheet, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import Text from '../../components/Text';
import StepIndicator from 'react-native-step-indicator';
import DEFAULT_STYLES from '../../../styles';
import Label from '../../components/Label';
import Image from '../../components/Image';

const styles = StyleSheet.create({
  subContainer: {margin: 20, flex: 1},
});

export default function InstallationHistoryDetail(props) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const labels = ['Received', 'Technician Assigned', 'In-Progress', 'CLOSED'];

  const {
    params: {item},
  } = props.route;

  const concatenateIfNotEmpty = (...strings) =>
    strings.filter(str => str).join(', ');

  const {address_line_1, address_line_2, city, state, contact_person_name} =
    item;

  const title = concatenateIfNotEmpty(
    address_line_1,
    address_line_2,
    city,
    state,
  );

  useEffect(() => {
    const index = labels.findIndex(el => item.status === el);
    if (index !== -1) {
      setCurrentPosition(index);
    }
  }, []);
  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Installation History Detail</HeadingWithBack>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 0.8}}>
            <Heading level={3} style={{marginBottom: 10}}>
              {item.product_details.title}
            </Heading>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
              }}>
              <Label size="small">Case Id:</Label> {item.id}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
              }}>
              <Label size="small">Date Registered:</Label> {item.date_added}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
              }}>
              <Label size="small">Preferred Date:</Label> {item.preferred_date}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
              }}>
              <Label size="small">Preferred Time:</Label> {item.preferred_time}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
                lineHeight: 17.5,
              }}>
              <Label size="small">Address:</Label> {title}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
                lineHeight: 17.5,
              }}>
              <Label size="small">Contact Person:</Label>{' '}
              {item.contact_person_name}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                marginTop: 10,
                fontSize: 12,
                lineHeight: 17.5,
              }}>
              <Label size="small">Contact Number:</Label>{' '}
              {item.contact_person_number}
            </Text>
          </View>
          <View style={{flex: 0.3}}>
            <Image
              source={{uri: item.product_details.thumbnail}}
              style={{width: '100%', height: 150, objectFit: 'contain'}}
            />
          </View>
        </View>
        <View style={{marginTop: 0, alignItems: 'center', flex: 1}}>
          <View>
            <StepIndicator
              direction="vertical"
              currentPosition={currentPosition}
              stepCount={labels.length}
              labels={labels}
              customStyles={{
                labelFontFamily: DEFAULT_STYLES.heading.fontFamily,
                labelSize: 12,
              }}
            />
          </View>
        </View>
      </View>
    </BaseContainer>
  );
}
