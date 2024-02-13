import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import {useAddressContext} from '../../hooks/address';
import Button from '../../components/Buttons';
import ListAddresses from '../../components/ListAddresses';
import BaseContainer from '../../containers/BaseContainer';
import isEmpty from 'lodash/isEmpty';
import EmptyContainer from '../../containers/EmptyContainer';

const styles = StyleSheet.create({
  container: {flex: 1},
  subContainer: {margin: 20, flex: 1},
});

export default function ManageAddresses({navigation}) {
  const {addresses, fetchAddresses} = useAddressContext();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAddresses();
  };
  useEffect(() => {
    setRefreshing(false);
  }, [addresses]);

  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Manage Addresses</HeadingWithBack>
        <EmptyContainer
          data={addresses}
          emptyHelp={
            <View style={{textAlign: 'center'}}>
              <Heading style={{textAlign: 'center'}} level={5}>
                There are no saved addresses.
              </Heading>
              <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Button onPress={() => navigation.navigate('AddAddress')}>
                  Add Address
                </Button>
              </View>
            </View>
          }>
          <ListAddresses refreshing={refreshing} onRefresh={handleRefresh} />
        </EmptyContainer>
      </View>
      {!isEmpty(addresses) && (
        <View style={{paddingHorizontal: 20, marginBottom: 10}}>
          <Button onPress={() => navigation.navigate('AddAddress')}>
            Add Address
          </Button>
        </View>
      )}
    </BaseContainer>
  );
}
