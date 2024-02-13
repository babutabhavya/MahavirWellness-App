import React from 'react';
import Label from '../Label';
import TouchableInput from '../TouchableInput';
import Text from '../Text';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Heading from '../Heading';
import {Surface} from 'react-native-paper';
import PREFERRED_TIME from '../../../assets/icons/preferredtime.png';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

export function ListPreferredTime({selected, onSelect}) {
  const OPTIONS = [
    {title: 'Morning (9AM-12PM)', value: 'Morning (9AM-12PM)'},
    {title: 'Afternoon (12PM - 4PM)', value: 'Afternoon (12PM - 4PM)'},
    {title: 'Evening (4PM - 9PM)', value: 'Evening (4PM - 9PM)'},
  ];

  const styles = StyleSheet.create({
    listProductsHeading: {marginBottom: 20},
    flatListItemSurface: {
      backgroundColor: 'white',
      width: '100%',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    flatListItemContentContainer: {
      marginHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 0,
    },
    itemCode: {fontSize: 12, marginTop: 10},
  });

  return (
    <BottomSheetFlatList
      contentContainerStyle={styles.flatListItemContentContainer}
      data={OPTIONS}
      ListHeaderComponent={
        <Heading level={5} style={styles.listProductsHeading}>
          Select Your Preferred Time*
        </Heading>
      }
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Surface
            style={[
              styles.flatListItemSurface,
              selected && selected.value === item.value
                ? {borderColor: 'black', borderWidth: 5}
                : {},
            ]}>
            <Heading level={7}>{item.title}</Heading>
          </Surface>
        </TouchableOpacity>
      )}
    />
  );
}

export default function PreferredTime({onPress, value, error}) {
  return (
    <>
      <Label>Preferred Time*</Label>
      <TouchableInput icon={PREFERRED_TIME} onPress={onPress} error={error}>
        <Text>{value ? value.title : ''}</Text>
      </TouchableInput>
    </>
  );
}
