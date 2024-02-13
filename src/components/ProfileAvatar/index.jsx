import React from 'react';
import {CONTENT_BASE_URL} from '../../config/api';
import isString from 'lodash/isString';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';

export default function ProfileAvatar({profileImage}) {
  const user = useSelector(state => state.authReducer.user);
  var {profile_image} = user;

  function getContentAbsoluteUrl(src) {
    const contentUrl = src
      ? src.includes(CONTENT_BASE_URL)
        ? src
        : `${CONTENT_BASE_URL}${
            isString(src) && src.startsWith('/') ? src : `/${src}`
          }`
      : src;

    const modifiedUrl = contentUrl
      ? contentUrl.replace('/backend', '')
      : contentUrl;

    return modifiedUrl;
  }

  const getImage = () => {
    var image =
      profileImage && !isString(profileImage)
        ? profileImage.uri
        : profileImage && isString(profileImage)
        ? profileImage
        : profile_image;
    return profileImage && !isString(profileImage)
      ? image
      : getContentAbsoluteUrl(image);
  };

  return (
    <Avatar.Image
      source={{
        uri: getImage() || 'https://picsum.photos/700',
      }}
      size={140}
    />
  );
}
