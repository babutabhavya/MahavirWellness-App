import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from '../Text';
import useCart from '../../hooks/cart';
import Heading from '../Heading';

export default function BillDetails() {
  const {
    totalCartValue,
    getTotalPrice,
    calculateTax,
    calculateDeliveryCharges,
    items,
  } = useCart();
  const [tax, setTax] = useState(calculateTax());
  const [dc, setDc] = useState(calculateDeliveryCharges());
  const [itemTotal, setItemTotal] = useState(getTotalPrice());
  const [total, setTotal] = useState(totalCartValue());

  useEffect(() => {
    setDc(calculateDeliveryCharges());
    setTax(calculateTax());
    setItemTotal(getTotalPrice());
    setTotal(totalCartValue());
  }, [items]);

  return (
    <View style={{marginTop: 20}}>
      <Heading level={5}>Bill Details</Heading>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text>Item Total</Text>
        <Text>{`INR ${itemTotal}`}</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text>Taxes</Text>
        <Text style={{color: 'green'}}>Inclusive of all Taxes</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text>Delivery Charges</Text>
        <Text style={{color: dc === 0 ? 'green' : 'black'}}>
          {dc === 0 ? 'Free' : `INR ${dc}`}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Heading level={5}>Grand Total</Heading>
        <Heading level={5}>{`INR ${total}`}</Heading>
      </View>
    </View>
  );
}
