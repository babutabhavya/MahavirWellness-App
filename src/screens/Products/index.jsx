import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import LoadingContainer from '../../containers/LoadingContainer';
import Api from '../../api';
import BaseContainer from '../../containers/BaseContainer';
import DEFAULT_STYLES from '../../../styles';
import Image from '../../components/Image';
import PROBLEM_ICON from '../../../assets/icons/problem.png';

const Products = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetProducts = () => {
    if (loading === false) {
      setLoading(true);
    }
    Api.get('/products/')
      .then(result => setProducts(result.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProductItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('ProductDetail', {item})}
        style={styles.productItem}>
        <Card style={DEFAULT_STYLES.card}>
          <Card.Cover source={{uri: item.thumbnail}} />
          <Card.Content style={styles.cardContent}>
            <Heading level={5} style={styles.cardTitle}>
              {item.title}
            </Heading>
            {item.description && (
              <Text style={styles.cardDescription}>{item.description}</Text>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <BaseContainer>
      <LoadingContainer loading={loading}>
        <View style={styles.innerContainer}>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Heading level={5} style={styles.heading}>
              Products
            </Heading>
          </View>
          <FlatList
            refreshing={loading}
            onRefresh={handleGetProducts}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            data={products}
            keyExtractor={item => item.code.toString() + item.id}
            renderItem={renderProductItem}
          />
        </View>
      </LoadingContainer>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: 10,
  },
  heading: {
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    flex: 1,
  },
  productItem: {
    marginBottom: 20,
  },
  cardContent: {
    minHeight: 75,
  },
  cardTitle: {
    marginTop: 10,
  },
  cardDescription: {
    marginTop: 7.5,
    lineHeight: 22.5,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default Products;
