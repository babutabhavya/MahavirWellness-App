import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import Back from '../../components/Buttons/Back';
import BaseContainer from '../../containers/BaseContainer';
import Price from '../../components/Price';
import Image from '../../components/Image';
import Button from '../../components/Buttons';
import useCart from '../../hooks/cart';
import InputSpinner from 'react-native-input-spinner';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export function PaginationItem(props) {
  const {animValue, index, length, backgroundColor, isRotate} = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: '#d3d3d3',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        marginHorizontal: 2,
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
}

export default function ProductDetail(props) {
  const {item} = props.route.params;
  const {addItemToCart, getQuantityInCart, removeItemFromCart} = useCart();
  const quantity = getQuantityInCart(item.id);
  const progressValue = useSharedValue(0);

  console.log('Item: ', item);

  const addToCart = newQuant => {
    if (quantity === 0) {
      addItemToCart(item);
    } else {
      addItemToCart({...item, quantity: newQuant});
    }
  };
  var images = [item.thumbnail, ...item.product_images];

  return (
    <BaseContainer>
      <ScrollView style={styles.flexContainer}>
        <View style={styles.backButtonContainer}>
          <Back />
        </View>
        <Carousel
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width / 1.5}
          data={images}
          scrollAnimationDuration={1000}
          pagingEnabled
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          renderItem={({item: image}) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <Image source={{uri: image}} style={styles.image} />
            </View>
          )}
        />
        {!!progressValue && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            {images.map((value, index) => {
              return (
                <PaginationItem
                  backgroundColor="black"
                  animValue={progressValue}
                  index={index}
                  key={index}
                  isRotate={false}
                  length={images.length}
                />
              );
            })}
          </View>
        )}
        <View style={styles.content}>
          <Heading level="3" style={styles.title}>
            {item.title}
          </Heading>
          <Price sellingPrice={item.selling_price} price={item.price} />
          <Text style={styles.description}>{item.detail}</Text>
        </View>
      </ScrollView>
      <View style={styles.addToCartButtonContainer}>
        <View style={{flex: 1}}>
          {quantity === 0 ? (
            <Button onPress={addToCart}>Add To Cart</Button>
          ) : (
            <InputSpinner
              max={10}
              min={0}
              colorMax={'#f04048'}
              colorMin={'#40c5f4'}
              value={quantity}
              buttonFontFamily="Montserrat-Bold"
              inputStyle={{fontFamily: 'Montserrat-Bold'}}
              skin="clean"
              onChange={num => {
                if (num === 0) {
                  removeItemFromCart(item.id);
                } else {
                  addToCart(num);
                }
              }}
            />
          )}
        </View>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000,
  },
  title: {marginBottom: 10},
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  description: {
    marginTop: 12.5,
    lineHeight: 22.5,
    textAlign: 'left',
    letterSpacing: 1.5,
    fontSize: 13,
  },
  addToCartButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
