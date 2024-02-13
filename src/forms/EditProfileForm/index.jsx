import React, {useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import {useSelector} from 'react-redux';
import {Surface} from 'react-native-paper';
import Button from '../../components/Buttons';
import TouchableInput from '../../components/TouchableInput';
import Text from '../../components/Text';
import PENCIL_ICON from '../../../assets/icons/pencil.png';
import isString from 'lodash/isString';
import {launchImageLibrary} from 'react-native-image-picker';
import ProfileAvatar from '../../components/ProfileAvatar';
import UserProfileAPIClient from '../../api/user';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';

export default function EditProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const {name, mobile, profile_image, email} = useSelector(
    state => state.authReducer.user,
  );
  const [fullName, setFullName] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [profileImage, setProfileImage] = useState(profile_image);
  const navigation = useNavigation();

  const handleOpenPictureSelector = async () => {
    const response = await launchImageLibrary({});
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      console.log('response here: ', response.assets[0]);
      setProfileImage(response.assets[0]);
    }
  };
  const userClient = new UserProfileAPIClient();
  const {getUserInfo} = useAuth();

  const handleSave = () => {
    setSubmitting(true);
    var formData = new FormData();
    formData.append('name', fullName);

    if (!isString(profileImage) && profileImage) {
      formData.append('profile_image', {
        name: profileImage.fileName,
        type: profileImage.type,
        uri:
          Platform.OS === 'ios'
            ? profileImage.uri.replace('file://', '')
            : profileImage.uri,
      });
    }

    userClient
      .updateProfile(formData)
      .then(getUserInfo)
      .then(() => setSubmitting(false))
      .catch(err => {
        console.log(err.response.data);
        setSubmitting(false);
      });
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <TouchableOpacity onPress={handleOpenPictureSelector}>
          <ProfileAvatar profileImage={profileImage} />
          <Surface
            elevation={5}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: 'white',
              borderRadius: 50,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={PENCIL_ICON} style={{width: '50%', height: '50%'}} />
          </Surface>
        </TouchableOpacity>
      </View>
      <Label>Name</Label>
      <TextInput value={fullName} onChange={setFullName} />
      <Label>Email</Label>
      <TouchableInput>
        <Text>{emailInput}</Text>
      </TouchableInput>
      <Label>Phone Number</Label>
      <TouchableInput>
        <Text>{mobile}</Text>
      </TouchableInput>
      <View style={{marginTop: 10}}>
        <Button onPress={() => navigation.navigate('ResetPassword')}>
          RESET PASSWORD
        </Button>
      </View>
      <View style={{marginTop: 30}}>
        <Button onPress={handleSave} loading={submitting}>
          SAVE
        </Button>
      </View>
    </View>
  );
}
