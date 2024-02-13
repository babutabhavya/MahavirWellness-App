import React from 'react';
import {View} from 'react-native';
import Text from '../Text';

const Price = ({price, sellingPrice}) => {
  const isDiscounted = sellingPrice < price;
  const discountPercentage = isDiscounted
    ? Math.floor(((price - sellingPrice) / price) * 100)
    : 0;

  return (
    <View style={{flexDirection: 'row', marginTop: 2.5}}>
      <Text
        style={[
          {fontSize: 16},
          isDiscounted ? {textDecorationLine: 'line-through'} : {},
        ]}>
        ₹{price}
      </Text>
      {isDiscounted && (
        <Text
          style={{
            color: 'green',
            fontSize: 16,
            marginLeft: 5,
          }}>
          ₹{sellingPrice} ({discountPercentage}% off)
        </Text>
      )}
    </View>
  );
};

export default Price;
