import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseContainer from '../../containers/BaseContainer';
import INSTALLATION_HISTORY from '../../../assets/icons/installationhistory.png';
import REQUEST_INSTALLATION from '../../../assets/icons/requestinstallation.png';
import REQUEST_SERVICE from '../../../assets/icons/requestservice.png';
import SERVICE_HISTORY from '../../../assets/icons/servicehistory.png';
import MY_DEVICES from '../../../assets/icons/mydevices.png';
import Heading from '../../components/Heading';
import AuthWrapper from '../../containers/AuthWrapper';

function ListServices({navigation}) {
  const SERVICES_OFFERED = [
    {
      title: 'Request Installation',
      onPress: () => navigation.navigate('RequestInstallation'),
      icon: REQUEST_INSTALLATION,
    },
    {
      title: 'Request Service',
      onPress: () => navigation.navigate('RequestService'),
      icon: REQUEST_SERVICE,
    },
    {
      title: 'Installation History',
      onPress: () => navigation.navigate('InstallationHistory'),
      icon: INSTALLATION_HISTORY,
    },
    {
      title: 'Service History',
      onPress: () => navigation.navigate('ServiceHistory'),
      icon: SERVICE_HISTORY,
    },
    {
      title: 'My Devices',
      onPress: () => navigation.navigate('MyDevices'),
      icon: MY_DEVICES,
    },
  ];

  return (
    <BaseContainer>
      <View style={styles.innerContainer}>
        <Heading level={5} style={styles.heading}>
          Services
        </Heading>

        <FlatList
          numColumns={2}
          data={SERVICES_OFFERED}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.serviceContainer}
              key={index}
              onPress={item.onPress}>
              <View
                style={[
                  styles.surface,
                  index % 2 === 0 ? styles.leftMargin : styles.rightMargin,
                ]}>
                <View style={styles.graphicContainer}>
                  <Image
                    source={item.icon}
                    style={{
                      width: '60%',
                      height: '60%',
                      objectFit: 'contain',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Heading level={8} style={styles.title}>
                    {item.title}
                  </Heading>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 30,
  },
  heading: {
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  graphicContainer: {
    // height: '62.5%',
    zIndex: 10000,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  surface: {
    flex: 1,
    marginTop: 15,
    backgroundColor: 'rgba(64, 224, 208, 0.4)',
    borderRadius: 20,
    height: 175,
  },
  leftMargin: {
    marginRight: 5,
    marginLeft: 10,
  },
  rightMargin: {
    marginRight: 10,
    marginLeft: 5,
  },
  serviceContainer: {flex: 0.5},
  contentContainer: {
    backgroundColor: 'rgba(64, 224, 208, 1)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: -1,
    position: 'absolute',
    width: '100%',
    top: '62.5%',
    height: '37.5%',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default AuthWrapper(ListServices);
