// ContactUsScreen.js
import React, {useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import Heading, {HeadingWithBack} from '../../components/Heading';
import BaseContainer from '../../containers/BaseContainer';
import Link from '../../components/Link';
import DEFAULT_STYLES from '../../../styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Buttons';
import Text from '../../components/Text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ContactUsClient from '../../api/requests/contact-us';
import isEmpty from 'lodash/isEmpty';

const styles = StyleSheet.create({
  subContainer: {margin: 20},
});

function ContactUsScreen() {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const openWhatsApp = () =>
    Linking.openURL(
      'whatsapp://send?phone=+919958087278&text=Hi! I need some information. Can you please help?',
    );

  const openEmail = () =>
    Linking.openURL(
      'mailto:wellnessmahavir@gmail.com.com?subject=Contact&body=Hi! I need some information. Can you please help?',
    );

  const openPhone = () => Linking.openURL('tel:+919958087278');

  const submitMessage = () => {
    if (!isEmpty(message)) {
      new ContactUsClient()
        .create({message})
        .then(() => {
          setMessage('');
        })
        .then(() => setSubmitting(false))
        .then(() => setMessageSent(true))
        .catch(err => console.log(err.response.data));
    }
  };

  return (
    <BaseContainer>
      <KeyboardAwareScrollView>
        <View style={styles.subContainer}>
          <HeadingWithBack>Contact Us</HeadingWithBack>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Heading level={4} style={{marginBottom: 20}}>
            CONNECT WITH US USING
          </Heading>
          <Link
            style={{...DEFAULT_STYLES.outlineButton, marginBottom: 25}}
            icon={require('../../../assets/icons/whatsapp.png')}
            onPress={openWhatsApp}>
            WHATSAPP
          </Link>
          <Link
            style={{...DEFAULT_STYLES.outlineButton, marginBottom: 25}}
            icon={require('../../../assets/icons/email.png')}
            onPress={openEmail}>
            EMAIL
          </Link>
          <Link
            style={{...DEFAULT_STYLES.outlineButton, marginBottom: 25}}
            icon={require('../../../assets/icons/phone-call.png')}
            onPress={openPhone}>
            PHONE
          </Link>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              marginVertical: 15,
            }}>
            OR
          </Text>
          <View style={{marginTop: 30}}>
            <Heading level={4} style={{marginBottom: 10}}>
              LEAVE US A MESSAGE
            </Heading>

            {!messageSent ? (
              <>
                <TextInput
                  placeholder="Type your message"
                  inputProps={{multiline: true}}
                  value={message}
                  onChange={setMessage}
                  containerStyle={{marginTop: 10}}
                />
                <View style={{marginTop: 10}}>
                  <Button loading={submitting} onPress={submitMessage}>
                    SUBMIT
                  </Button>
                </View>
              </>
            ) : (
              <View style={{paddingVertical: 20}}>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    lineHeight: 20,
                  }}>
                  Thank you for reaching out to us.
                </Text>
                <Text
                  style={{
                    marginBottom: 20,
                    color: 'green',
                    marginTop: 10,
                    fontWeight: 'bold',
                    lineHeight: 20,
                  }}>
                  We value your time and effort and ensure you that someone from
                  our team will get back to your shortly.
                </Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BaseContainer>
  );
}

export default ContactUsScreen;
