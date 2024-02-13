import React, {useEffect, useState} from 'react';
import BaseContainer from '../../containers/BaseContainer';
import Text from '../../components/Text';
import {FlatList, StyleSheet, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import LoadingContainer from '../../containers/LoadingContainer';
import EmptyContainer from '../../containers/EmptyContainer';
import Button from '../../components/Buttons';
import OrderClient from '../../api/order';
import {Surface} from 'react-native-paper';
import DEFAULT_STYLES from '../../../styles';
import DateParser from '../../utils/date-parser';
import {concatenateIfNotEmpty} from '../../components/AddressCard';

const styles = StyleSheet.create({
  subContainer: {marginHorizontal: 20, marginTop: 20},
});

function OrderHistoryCard({item}) {
  const address = concatenateIfNotEmpty(
    item.address_line_1,
    item.address_line_2,
    item.city,
    item.state,
  );

  console.log('Address: ', address);
  return (
    <Surface
      style={{
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 20,
      }}>
      <View>
        <View style={{padding: 20, flex: 0.7, justifyContent: 'space-evenly'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Heading level={6} style={{marginTop: 10}}>
                Order Date
              </Heading>
              <Text style={{marginTop: 5}}>
                {DateParser.formatWithOrdinal(new Date(item.order_date))}
              </Text>
            </View>
            <Heading level={5}>#{item.id}</Heading>
          </View>

          <Heading level={6} style={{marginTop: 10}}>
            Address
          </Heading>
          <Text style={{marginTop: 5}}>{address}</Text>
          <Heading level={6} style={{marginTop: 10}}>
            Products
          </Heading>
          {item.products.map(el => (
            <View
              style={{marginTop: 5}}
              key={`order-product-${el.id}-${el.quantity}`}>
              <Text>
                {el.quantity} x {el.title}
              </Text>
            </View>
          ))}
          <Text
            style={{
              color: 'green',
              ...DEFAULT_STYLES.bold,
              marginTop: 10,
              fontSize: 16,
            }}>
            Status: {item.status}
          </Text>
        </View>
      </View>
    </Surface>
  );
}

export default function OrderHistory({navigation}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const client = new OrderClient();

  const handleGetHistory = () => client.list().then(setHistory);

  const handleRefresh = () => {
    setLoading(true);
    handleGetHistory().then(() => setLoading(false));
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  console.log(history);

  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Order History</HeadingWithBack>
      </View>
      <LoadingContainer loading={loading}>
        <EmptyContainer
          data={history}
          emptyHelp={
            <View style={{textAlign: 'center', paddingHorizontal: 20}}>
              <Heading style={{textAlign: 'center'}} level={5}>
                You have not previously placed an order with us.
              </Heading>
              <View style={{marginTop: 20}}>
                <Button onPress={() => navigation.navigate('Shop')}>
                  View our products
                </Button>
              </View>
            </View>
          }>
          <FlatList
            data={history}
            refreshing={loading}
            onRefresh={handleRefresh}
            contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
            renderItem={({item}) => (
              <View>
                <OrderHistoryCard item={item} />
              </View>
            )}
          />
        </EmptyContainer>
      </LoadingContainer>
    </BaseContainer>
  );
}
