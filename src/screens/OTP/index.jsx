import React from 'react';
import {View, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import OTPForm from '../../forms/OTPForm';
import Label from '../../components/Label';
import BaseContainer from '../../containers/BaseContainer';

function OTPScreen(props) {
  const {params} = props.route;

  return (
    <BaseContainer style={styles.container}>
      <View style={styles.content}>
        <Heading level="1" style={styles.heading}>
          OTP Verification
        </Heading>
        <Label style={{lineHeight: 20, textAlign: 'center'}}>
          Verification code sent to +91-
          {params.phone || params.mobile || params.signupPayload.mobile}
        </Label>
        <OTPForm {...params} />
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {marginBottom: 15, textAlign: 'center'},
  content: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 200,
    justifyContent: 'center',
  },
});

export default OTPScreen;
