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
  rowContainer: {flexDirection: 'row', marginTop: 10},
  textContainer: {flex: 0.7, paddingRight: 10},
  text: {fontWeight: '500', marginTop: 10, fontSize: 12},
  label: {fontWeight: '500', marginTop: 10, fontSize: 12, lineHeight: 17.5},
  imageContainer: {flex: 0.3},
  image: {width: '100%', height: 150, objectFit: 'contain'},
  stepIndicatorContainer: {marginTop: 0, alignItems: 'center', flex: 1},
  stepIndicator: {
    labelFontFamily: DEFAULT_STYLES.heading.fontFamily,
    labelSize: 12,
  },
});

export default function ServiceHistoryDetail(props) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const labels = ['Received', 'Technician Assigned', 'In-Progress', 'CLOSED'];

  const {
    params: {item},
  } = props.route;

  const concatenateIfNotEmpty = (...strings) =>
    strings.filter(str => str).join(', ');

  const {address_line_1, address_line_2, city, state} = item;

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
        <HeadingWithBack>Service History Detail</HeadingWithBack>

        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Heading level={3}>{item.product_details.title}</Heading>
            <Text style={styles.text}>
              <Label size="small">Case Id:</Label> {item.id}
            </Text>
            <Text style={styles.text}>
              <Label size="small">Problem:</Label> {item.problem}
            </Text>
            <Text style={styles.text}>
              <Label size="small">Date Registered:</Label> {item.date_added}
            </Text>
            <Text style={styles.text}>
              <Label size="small">Preferred Date:</Label> {item.preferred_date}
            </Text>
            <Text style={styles.text}>
              <Label size="small">Preferred Time:</Label> {item.preferred_time}
            </Text>
            <Text style={styles.label}>
              <Label size="small">Address:</Label> {title}
            </Text>
            <Text style={styles.label}>
              <Label size="small">Contact Person:</Label>{' '}
              {item.contact_person_name}
            </Text>
            <Text style={styles.label}>
              <Label size="small">Contact Number:</Label>{' '}
              {item.contact_person_number}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.product_details.thumbnail}}
              style={styles.image}
            />
          </View>
        </View>

        <View style={styles.stepIndicatorContainer}>
          <StepIndicator
            direction="vertical"
            currentPosition={currentPosition}
            stepCount={labels.length}
            labels={labels}
            customStyles={styles.stepIndicator}
          />
        </View>
      </View>
    </BaseContainer>
  );
}
