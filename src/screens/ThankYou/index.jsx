import React, {useEffect, useState} from 'react';
import useCart from '../../hooks/cart';
import Heading from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import {View} from 'react-native';
import Button from '../../components/Buttons';
import RateUs from '../../components/RateUs';
import Text from '../../components/Text';
import LottieView from 'lottie-react-native';

function ThankYou({navigation}) {
  const [showReview, setShowReview] = useState(false);
  const {resetCartItems} = useCart();

  useEffect(() => {
    resetCartItems();
    setTimeout(() => setShowReview(true), 2000);
  }, []);

  return (
    <BaseContainer>
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Heading level={1} style={{textAlign: 'center'}}>
          Thank You
        </Heading>
        <Text style={{textAlign: 'center', marginTop: 20}}>
          Your order has been successfully placed.
        </Text>
        <View style={{position: 'fixed', top: 50}}>
          <LottieView
            source={require('../../../assets/thankyou-1.json')}
            style={{width: '100%', height: 600}}
            autoPlay
            loop
          />
        </View>
        <View style={{width: '85%', alignSelf: 'center'}}>
          <Button
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'LoggedInRoute',
                  },
                ],
              })
            }>
            Back To Home
          </Button>
        </View>
      </View>
      <RateUs show={showReview} onClose={() => setShowReview(false)} />
    </BaseContainer>
  );
}

export default ThankYou;
