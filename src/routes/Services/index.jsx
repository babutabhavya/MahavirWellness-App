import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ListServices from '../../screens/ListServices';
import RequestInstallation from '../../screens/RequestInstallation';
import MyDevices from '../../screens/MyDevices';
import RequsetService from '../../screens/RequestService';
import ServiceHistory from '../../screens/ServiceHistory';

const Stack = createNativeStackNavigator();
const LServicesStack = createNativeStackNavigator();

function ListServicesStack() {
  return (
    <LServicesStack.Navigator initialRouteName="ListServices">
      <Stack.Screen
        name="RequestInstallation"
        component={RequestInstallation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyDevices"
        component={MyDevices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestService"
        component={RequsetService}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceHistory"
        component={ServiceHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListServices"
        component={ListServices}
        options={{headerShown: false}}
      />
    </LServicesStack.Navigator>
  );
}

export default function ServicesStack() {
  return (
    <Stack.Navigator initialRouteName="ListServicesStack">
      <Stack.Screen
        name="ListServicesStack"
        component={ListServicesStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
