import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  redButton: {
    backgroundColor: 'red',
  },
  orangeButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default function SelectDestination() {
  const navigation = useNavigation();

  const buttons = [
    {title: 'Products', color: 'red', screen: 'Shop'},
    {title: 'Services', color: 'orange', screen: 'Services'},
  ];

  return (
    <>
      {buttons.map((el, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            el.color === 'red' ? styles.redButton : styles.orangeButton,
          ]}
          onPress={() => navigation.navigate(el.screen)}>
          <View style={styles.container}>
            <Heading level={1} style={styles.buttonText}>
              {el.title}
            </Heading>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
