import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AddressCard from '../AddressCard';
import {useAddressContext} from '../../hooks/address';

const styles = StyleSheet.create({
  contentContainerStyle: {padding: 10},
});

export default function ListAddresses({
  refreshing,
  onRefresh,
  onSelect,
  Component = FlatList,
  ...props
}) {
  const {addresses} = useAddressContext();

  return (
    <Component
      contentContainerStyle={styles.contentContainerStyle}
      data={addresses}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item, index}) => (
        <View style={{marginBottom: 25}}>
          <AddressCard address={item} onSelect={onSelect} />
        </View>
      )}
      {...props}
    />
  );
}
