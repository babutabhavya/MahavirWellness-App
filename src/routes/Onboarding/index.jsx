import React from 'react';
import LoginScreen from '../../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from '../../screens/OTP';
import TermsAndCondition from '../../screens/TermsAndConditions';
import SignupScreen from '../../screens/Signup';
import LoginWithPasswordScreen from '../../screens/LoginWithPassword';
import ForgotPasswordScreen from '../../screens/ForgotPassword';
import WelcomeScreen from '../../screens/Welcome';
const Stack = createNativeStackNavigator();

function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="LoginWithPassword"
        component={LoginWithPasswordScreen}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen
        name="TNC"
        component={TermsAndCondition}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default OnboardingStack;
