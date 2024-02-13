import React from 'react';
import {Modal, TouchableWithoutFeedback, View} from 'react-native';

export default function Popup({isVisible, onRequestClose, ...props}) {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        {...props}>
        <TouchableWithoutFeedback onPress={onRequestClose} style={{flex: 1}}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {props.children}
        </View>
      </Modal>
    </View>
  );
}
