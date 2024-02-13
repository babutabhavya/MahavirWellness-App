import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import Button from '../../components/Buttons';
import EmptyContainer from '../../containers/EmptyContainer';
import {useNavigation} from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import MyDevicesClient from '../../api/my-devices';
import LoadingContainer from '../../containers/LoadingContainer';
import {Surface} from 'react-native-paper';
import Text from '../../components/Text';
import DateParser from '../../utils/date-parser';
import Link from '../../components/Link';
import DEFAULT_STYLES from '../../../styles';
import {getAPIErrorMessage} from '../../utils';
import Image from '../../components/Image';

const styles = StyleSheet.create({
  subContainer: {marginHorizontal: 20, marginTop: 20},
});

function MyDeviceCard({item}) {
  return (
    <Surface
      style={{backgroundColor: 'white', borderRadius: 15, marginBottom: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, flex: 0.7, justifyContent: 'space-evenly'}}>
          <Heading level={4}>
            {item.product_details.title}
            <Text style={{fontSize: 12}}>
              {' '}
              Code: ({item.product_details.code})
            </Text>
          </Heading>

          <Text style={{fontSize: 11}}>
            <Text style={{fontWeight: 'bold'}}>Serial Number:</Text>{' '}
            {item.serial_number}
          </Text>
          <Text style={{fontSize: 11}}>
            <Text style={{fontWeight: 'bold'}}>Date Added:</Text>{' '}
            {DateParser.formatWithOrdinal(DateParser.parse(item.date_added))}
          </Text>
          <Text style={{fontSize: 11}}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Approval Request:
            </Text>{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item.status === 'Received'
                    ? 'orange'
                    : item.status === 'Approved'
                    ? 'green'
                    : 'red',
              }}>
              {item.status}
            </Text>
          </Text>
        </View>
        <View style={{flex: 0.3, paddingHorizontal: 20}}>
          <Image
            source={{uri: item.product_details.thumbnail}}
            style={{width: '100%', height: 150, objectFit: 'contain'}}
          />
        </View>
      </View>
      {item.status === 'Approved' && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 20,
          }}>
          {item.installation_done === true ? (
            <Link
              style={{
                ...DEFAULT_STYLES.outlineButton,
                paddingVertical: 5,
                flex: 0.45,
                fontSize: 8,
                borderColor:
                  item.installation_done === true ? 'green' : 'black',
                backgroundColor:
                  item.installation_done === true ? 'green' : 'white',
              }}
              textStyle={{
                fontSize: 10,
                color: item.installation_done === true ? 'white' : 'black',
                fontWeight: item.installation_done === true ? 'bold' : 'normal',
              }}>
              'Installation Done'
            </Link>
          ) : (
            <Link
              style={{
                ...DEFAULT_STYLES.outlineButton,
                paddingVertical: 5,
                flex: 0.45,
                fontSize: 8,
                borderColor:
                  item.installation_done === true ? 'green' : 'black',
                backgroundColor:
                  item.installation_done === true ? 'green' : 'white',
              }}
              textStyle={{
                fontSize: 10,
                color: item.installation_done === true ? 'white' : 'black',
                fontWeight: item.installation_done === true ? 'bold' : 'normal',
              }}
              to="RequestInstallation"
              params={{
                product: item.product_details,
                serialNumber: item.serial_number,
              }}>
              {item.installation_done === true
                ? 'Installation Done'
                : 'Request Installation'}
            </Link>
          )}
          <Link
            style={{
              ...DEFAULT_STYLES.outlineButton,
              paddingVertical: 5,
              flex: 0.45,
            }}
            textStyle={{fontSize: 10}}
            to="RequestService"
            params={{
              product: item.product_details,
              serialNumber: item.serial_number,
            }}>
            Request Service
          </Link>
        </View>
      )}
    </Surface>
  );
}

export default function MyDevices() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetHistory = () => new MyDevicesClient().list().then(setData);

  const handleRefresh = () => {
    setRefreshing(true);
    handleGetHistory().then(() => setRefreshing(false));
  };

  useEffect(() => {
    setLoading(true);

    handleGetHistory()
      .then(() => setLoading(false))
      .catch(error => {
        const message = getAPIErrorMessage(error);
        console.log('message: ', message);
      });
  }, []);

  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>My Devices</HeadingWithBack>
      </View>
      <LoadingContainer loading={loading}>
        <EmptyContainer
          data={data}
          emptyHelp={
            <View
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
              }}>
              <Heading
                style={{textAlign: 'center', lineHeight: 27.5}}
                level={5}>
                You have no devices added. If you have already purchased a
                device, and have the serial number, add your device now.
              </Heading>
              <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Button onPress={() => navigation.navigate('AddNewMyDevice')}>
                  Add A New Device
                </Button>
              </View>
            </View>
          }>
          <FlatList
            data={data}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(item, index) =>
              `${item.product_details.id}-${index}`
            }
            contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
            renderItem={({item}) => (
              <View>
                <MyDeviceCard item={item} />
              </View>
            )}
          />
          {!isEmpty(data) && data && (
            <View style={{paddingHorizontal: 20}}>
              <Button onPress={() => navigation.navigate('AddNewMyDevice')}>
                Add A New Device
              </Button>
            </View>
          )}
        </EmptyContainer>
      </LoadingContainer>
    </BaseContainer>
  );
}
