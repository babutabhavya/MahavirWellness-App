import React from 'react';
import {Platform, View} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import Text from '../Text';
import Popup from '../Popup';
import Button from '../Buttons';

const rateUs = () =>
  Rate.rate(
    {
      AppleAppID: '1579584069',
      GooglePackageName: 'com.chefpin',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
    },
    (success, errorMessage) => {
      if (success) {
        console.debug('Success');
      }
      if (errorMessage) {
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    },
  );

export default function RateUs({show, onClose}) {
  return (
    <Popup visible={show} onRequestClose={onClose}>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: 'white',
          width: '95%',
          paddingTop: 20,
          paddingBottom: 35,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 15,
            fontSize: 20,
          }}>
          Enjoying Mahavir Wellness?
        </Text>
        <Text
          style={{
            textAlign: 'center',
            paddingBottom: 30,
            fontSize: 16,
            color: '#696969',
            fontWeight: 'bold',
          }}>{`Rate us on the ${
          Platform.OS === 'android' ? 'google play' : 'app'
        } store.`}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{flex: 0.45}}>
            <Button onPress={onClose}>LATER</Button>
          </View>
          <View style={{flex: 0.45}}>
            <Button
              onPress={() => {
                rateUs();
                onClose();
              }}>
              YES
            </Button>
          </View>
        </View>
      </View>
    </Popup>
  );
}
