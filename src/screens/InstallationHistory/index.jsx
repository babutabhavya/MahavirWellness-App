import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import InstallationRequestClient from '../../api/requests/installation';
import LoadingContainer from '../../containers/LoadingContainer';
import BaseContainer from '../../containers/BaseContainer';
import {Surface} from 'react-native-paper';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import EmptyContainer from '../../containers/EmptyContainer';
import Button from '../../components/Buttons';
import Image from '../../components/Image';

const styles = StyleSheet.create({
  subContainer: {marginHorizontal: 20, marginTop: 20},
});

function InstallationHistoryCard({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{marginBottom: 20, borderRadius: 15}}
      onPress={() => navigation.navigate('InstallationHistoryDetail', {item})}>
      <Surface style={{backgroundColor: 'white', borderRadius: 15}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{padding: 20, flex: 0.7, justifyContent: 'space-evenly'}}>
            <Heading level={5}>
              {item.product_details.title}
              <Text style={{fontSize: 12}}>
                {' '}
                Code: ({item.product_details.code})
              </Text>
            </Heading>

            <Text style={{fontSize: 12, fontWeight: '500'}}>
              New Installation
            </Text>
            <Text style={{color: 'green', fontWeight: 'bold'}}>
              {item.status}
            </Text>
          </View>
          <View style={{flex: 0.3, paddingVertical: 15, paddingHorizontal: 20}}>
            <Image
              source={{uri: item.product_details.thumbnail}}
              style={{width: '100%', height: 100, objectFit: 'contain'}}
            />
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
}

export default function InstallationHistory() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  const handleGetHistory = () =>
    new InstallationRequestClient().list().then(setHistory);

  useEffect(() => {
    handleGetHistory().then(() => setLoading(false));
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    handleGetHistory().then(() => setLoading(false));
  };

  return (
    <BaseContainer>
      <View style={styles.subContainer}>
        <HeadingWithBack>Installation History</HeadingWithBack>
      </View>
      <LoadingContainer loading={loading}>
        <EmptyContainer
          data={history}
          emptyHelp={
            <View style={{textAlign: 'center'}}>
              <Heading style={{textAlign: 'center'}} level={5}>
                There are no installation requests.
              </Heading>
              <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Button
                  onPress={() => navigation.navigate('RequestInstallation')}>
                  Request Installation
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
                <InstallationHistoryCard item={item} />
              </View>
            )}
          />
        </EmptyContainer>
      </LoadingContainer>
    </BaseContainer>
  );
}
