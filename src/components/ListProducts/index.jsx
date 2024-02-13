import React, {useEffect, useState} from 'react';
import Api from '../../api';
import LoadingContainer from '../../containers/LoadingContainer';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Heading from '../Heading';
import Text from '../Text';
import {Surface} from 'react-native-paper';
import DEFAULT_STYLES from '../../../styles';
import MyDevicesClient from '../../api/my-devices';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  link: {
    ...DEFAULT_STYLES.outlineButton,
    marginTop: 10,
  },
  submit: {marginTop: 30},
  listProductsHeading: {marginBottom: 20},
  flatListItemSurface: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  flatListItemContentContainer: {marginHorizontal: 20, paddingBottom: 40},
  itemCode: {fontSize: 12, marginTop: 10},
});

export default function ListProducts({selected, onSelect, my, ...props}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetProducts = () => {
    if (loading === false) {
      setLoading(true);
    }
    if (my === true) {
      new MyDevicesClient()
        .list()
        .then(result => {
          var newData = [...result];
          newData = newData.map(el => ({...el, ...el.product_details}));

          setProducts(newData);
        })
        .then(() => setLoading(false));
    } else {
      Api.get('/products/')
        .then(result => setProducts(result.data))
        .then(() => setLoading(false));
    }
  };

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LoadingContainer loading={loading}>
      <BottomSheetFlatList
        contentContainerStyle={styles.flatListItemContentContainer}
        {...props}
        scrollEnabled
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Surface
              style={[
                styles.flatListItemSurface,
                selected && selected.id === item.id
                  ? {borderColor: 'black', borderWidth: 5}
                  : {},
              ]}>
              <Heading level={7}>{item.title}</Heading>
              <Text style={styles.itemCode}>{item.code}</Text>
            </Surface>
          </TouchableOpacity>
        )}
      />
    </LoadingContainer>
  );
}
