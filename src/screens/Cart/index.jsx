import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Heading from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import useCart from '../../hooks/cart';
import Button from '../../components/Buttons';
import EmptyContainer from '../../containers/EmptyContainer';
import Image from '../../components/Image';
import Price from '../../components/Price';
import InputSpinner from 'react-native-input-spinner';
import BillDetails from '../../components/BillDetails';
import AddressCard from '../../components/AddressCard';
import {useBottomSheet} from '../../hooks/bottomSheet';
import ListAddresses from '../../components/ListAddresses';
import OrderClient from '../../api/order';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import LoadingContainer from '../../containers/LoadingContainer';
import {CommonActions} from '@react-navigation/native';

export default function CartScreen({navigation}) {
  const client = new OrderClient();
  const {email, mobile, name} = useSelector(state => state.authReducer.user);

  const [address, setAddress] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    items,
    getQuantityInCart,
    removeItemFromCart,
    addItemToCart,
    totalCartValue,
    calculateDeliveryCharges,
    calculateTax,
  } = useCart();
  const {openBottomSheet, closeSheet} = useBottomSheet();
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  const addToCart = (newQuant, item) => {
    const quantity = getQuantityInCart(item.id);
    if (quantity === 0) {
      addItemToCart(item);
    } else {
      addItemToCart({...item, quantity: newQuant});
    }
  };

  const handleOpenSelectAddress = () =>
    openBottomSheet(
      <View>
        <ListAddresses
          ListHeaderComponent={
            <Heading level={5} style={styles.listProductsHeading}>
              Select Address*
            </Heading>
          }
          onSelect={item => {
            setAddress(item);
            closeSheet();
          }}
          ListFooterComponent={
            <Button
              onPress={() => {
                closeSheet();
                navigation.navigate('AddAddress');
              }}>
              Add Address
            </Button>
          }
        />
      </View>,
    );
  const handleOpenRazorpay = response => {
    const {
      data: {amount, id},
    } = response;
    var options = {
      prefill: {email, contact: mobile, name},
      order_id: id,
      currency: 'INR',
      key: 'rzp_test_SvkvWqsV4AEQt0',
      amount,
      name: 'Mahavir Wellness',
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        const {razorpay_payment_id, razorpay_signature, razorpay_order_id} =
          data;
        setLoading(true);
        client
          .complete({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_order_id,
          })
          .then(() => setLoading(false))
          .then(() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'ThankYou'}],
              }),
            ),
          )
          .catch(error => {
            console.log(error.response.data);
            setSubmitting(false);
          });
      })
      .catch(error => {
        console.log(`Error: ${error.code} | ${error.description}`);
        setSubmitting(false);
      });
  };
  const handleSubmit = () => {
    if (!isLoggedIn) {
      navigation.navigate('Onboarding', {screen: 'Login'});
    } else if (!address) {
      handleOpenSelectAddress();
    } else {
      setSubmitting(true);
      const tax = calculateTax();
      const delivery_charges = calculateDeliveryCharges();
      const total = totalCartValue();

      const payload = {
        products: items,
        ...address,
        tax,
        delivery_charges,
        total,
      };
      client
        .initiate(payload)
        .then(handleOpenRazorpay)
        .catch(error => {
          console.log(error.response.data);
          setSubmitting(false);
        });
    }
  };

  return (
    <BaseContainer>
      <LoadingContainer loading={loading}>
        <EmptyContainer
          data={items}
          emptyHelp={
            <View style={{textAlign: 'center'}}>
              <Heading style={{textAlign: 'center'}} level={5}>
                There are no products in your cart.
              </Heading>
              <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Button onPress={() => navigation.navigate('Shop')}>
                  VIEW OUR PRODUCTS
                </Button>
              </View>
            </View>
          }>
          <FlatList
            data={items}
            style={{flex: 1}}
            contentContainerStyle={{
              paddingHorizontal: 15,
              flex: 1,
            }}
            renderItem={({item, index}) => (
              <>
                {index === 0 && (
                  <View style={styles.innerContainer}>
                    <Heading level={4} style={{textAlign: 'center'}}>
                      Cart
                    </Heading>
                    <Heading level={5}>Items</Heading>
                  </View>
                )}
                <View style={{marginTop: 15, flexDirection: 'row'}}>
                  <View style={{flex: 0.6}}>
                    <Image
                      source={{uri: item.thumbnail}}
                      style={{
                        width: '100%',
                        height: 150,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1.4,
                      paddingHorizontal: 10,
                      justifyContent: 'space-evenly',
                    }}>
                    <Heading level={6}>{item.title}</Heading>
                    <Price
                      sellingPrice={item.selling_price}
                      price={item.price}
                    />
                    <View style={{marginTop: 5}}>
                      <InputSpinner
                        height={40}
                        width={150}
                        max={10}
                        min={0}
                        colorMax={'#f04048'}
                        colorMin={'#40c5f4'}
                        value={getQuantityInCart(item.id)}
                        buttonFontFamily="Montserrat-Bold"
                        inputStyle={{fontFamily: 'Montserrat-Bold'}}
                        skin="clean"
                        onChange={num => {
                          if (num === 0) {
                            removeItemFromCart(item.id);
                          } else {
                            addToCart(num, item);
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          />
          <View style={{paddingHorizontal: 15}}>
            {address && (
              <View style={{marginVertical: 20}}>
                <Heading level={6} style={{paddingVertical: 10}}>
                  Delivery Address
                </Heading>
                <AddressCard address={address} noActions={true} />
              </View>
            )}

            <BillDetails />
            <View style={{marginTop: 20}}>
              <Button onPress={handleSubmit} loading={submitting}>
                {!isLoggedIn
                  ? 'LOGIN TO CONTINUE'
                  : !address
                  ? 'SELECT ORDER ADDRESS'
                  : `Plac${submitting ? 'ing' : 'e'} Order`}
              </Button>
            </View>
          </View>
        </EmptyContainer>
      </LoadingContainer>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 10,
  },
  heading: {
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    flex: 1,
  },
  listProductsHeading: {marginBottom: 20},
});
