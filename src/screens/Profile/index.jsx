// ProfileScreen.js
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Text from '../../components/Text';
import {Card, Modal, Portal, Surface} from 'react-native-paper';
import Heading from '../../components/Heading';
import CONTACT_US from '../../../assets/icons/contact.png';
import MANAGE_ADDRESSES from '../../../assets/icons/manage-addresses.png';
import EDIT_PROFILE from '../../../assets/icons/edit-profile.png';
import SIGN_OUT from '../../../assets/icons/sign-out.png';
import {useDispatch, useSelector} from 'react-redux';
import ACTION_TYPES from '../../constants/actions';
import BaseContainer from '../../containers/BaseContainer';
import Button from '../../components/Buttons';
import DEFAULT_STYLES from '../../../styles';
import ProfileAvatar from '../../components/ProfileAvatar';
import Image from '../../components/Image';
import USER_AGREEMENT from '../../../assets/icons/user-agreement.jpeg';
import {useAuth} from '../../hooks/auth';
import AuthWrapper from '../../containers/AuthWrapper';

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  menuItemContainer: {paddingHorizontal: 10, marginTop: 20},
  menuItemSurface: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 22.5,
    height: 22.5,
  },
  menuItemText: {
    marginLeft: 15,
  },
  name: {textAlign: 'center'},
  contact: {textAlign: 'center', marginVertical: 10},
});

function ProfileScreen({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
  };
  const user = useSelector(state => state.authReducer.user);

  const {name, mobile} = user;

  const hideModal = () => setIsModalVisible(false);
  const {getUserInfo} = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <BaseContainer>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <ProfileAvatar />
        </View>
        {name && (
          <Heading level={4} style={styles.name}>
            {name}
          </Heading>
        )}
        <Heading level={name ? 6 : 4} style={styles.contact}>
          {mobile}
        </Heading>
        <View style={styles.menuItemContainer}>
          {[
            {
              icon: EDIT_PROFILE,
              text: 'Edit Profile',
              onPress: () => navigation.navigate('EditProfile'),
            },
            {
              icon: EDIT_PROFILE,
              text: 'Order History',
              onPress: () => navigation.navigate('OrderHistory'),
            },
            {
              icon: MANAGE_ADDRESSES,
              text: 'Manage Addresses',
              onPress: () => navigation.navigate('ManageAddresses'),
            },
            {
              icon: CONTACT_US,
              text: 'Contact Us',
              onPress: () => navigation.navigate('ContactUs'),
            },
            {
              icon: USER_AGREEMENT,
              text: 'User License Agreement',
              onPress: () => navigation.navigate('UserLicenseAgreement'),
            },
            {
              icon: SIGN_OUT,
              text: 'Logout',
              onPress: () => setIsModalVisible(true),
            },
          ].map((item, index) => (
            <Surface key={index} style={styles.menuItemSurface}>
              <TouchableOpacity
                style={styles.menuItemContent}
                onPress={item.onPress}>
                <Image source={item.icon} style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>{item.text}</Text>
              </TouchableOpacity>
            </Surface>
          ))}
        </View>
      </View>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={hideModal}>
          <Card style={[{padding: 20}, DEFAULT_STYLES.card]}>
            <Heading level={5} style={{marginBottom: 20}}>
              LOGOUT?
            </Heading>
            <Text style={{marginBottom: 20}}>
              Are you sure you want to logout?
            </Text>
            <Card.Actions>
              <View>
                <Button onPress={logout}>Confirm</Button>
              </View>
              <View>
                <Button onPress={hideModal}>Cancel</Button>
              </View>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </BaseContainer>
  );
}

export default AuthWrapper(ProfileScreen);
