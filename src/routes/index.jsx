import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingStack from './Onboarding';
import {
  AnimatedTabBarNavigator,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import DEFAULT_STYLES from '../../styles';
import RequestInstallation from '../screens/RequestInstallation';
import MyDevices from '../screens/MyDevices';
import RequestService from '../screens/RequestService';
import ServiceHistory from '../screens/ServiceHistory';
import ListServices from '../screens/ListServices';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import {useSelector} from 'react-redux';
import EditProfile from '../screens/EditProfile';
import ManageAddresses from '../screens/ManageAddresses';
import ContactUsScreen from '../screens/ContactUs';
import AddAddress from '../screens/AddAddress';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {AddressProvider} from '../hooks/address';
import {BottomSheetProvider} from '../hooks/bottomSheet';
import InstallationHistory from '../screens/InstallationHistory';
import ProfileScreen from '../screens/Profile';
import InstallationHistoryDetail from '../screens/InstallationHistoryDetail';
import ServiceHistoryDetail from '../screens/ServiceHistoryDetail';
import {Image} from 'react-native';
import AddNewMyDevice from '../screens/AddMyDevice';
import UserLicenseAgreement from '../screens/UserLicenseAgreement';
import {useAuth} from '../hooks/auth';
import ResetPasswordScreen from '../screens/ResetPassword';
import CartScreen from '../screens/Cart';
import ThankYou from '../screens/ThankYou';
import OrderHistory from '../screens/OrderHistory';

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

function HomeTabStack() {
  return (
    <Tabs.Navigator
      initialRouteName="Shop"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#000000',
        labelStyle: {
          ...DEFAULT_STYLES.heading,
        },
      }}
      appearance={{
        shadow: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
        whenInactiveShow: TabElementDisplayOptions.LABEL_ONLY,
      }}>
      <Tabs.Screen
        name="Shop"
        component={Products}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/E_Store_icon.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/cart.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Services"
        component={ListServices}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/Services_icon.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/Profile_Icon.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function Routes() {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const isGuest = useSelector(state => state.authReducer.isGuest);

  const {getUserInfo} = useAuth();

  React.useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <PaperProvider>
        <AddressProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <BottomSheetProvider>
                <Stack.Navigator
                  initialRouteName={
                    isLoggedIn === true || isGuest === true
                      ? 'LoggedInRoute'
                      : 'Onboarding'
                  }>
                  <>
                    {(!isLoggedIn || isGuest) && (
                      <Stack.Screen
                        name="Onboarding"
                        component={OnboardingStack}
                        options={{headerShown: false}}
                      />
                    )}
                    {(isLoggedIn || isGuest) && (
                      <>
                        <Stack.Screen
                          name="LoggedInRoute"
                          component={HomeTabStack}
                          options={{headerShown: false}}
                        />
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
                          component={RequestService}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ServiceHistory"
                          component={ServiceHistory}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="InstallationHistory"
                          component={InstallationHistory}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="InstallationHistoryDetail"
                          component={InstallationHistoryDetail}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ServiceHistoryDetail"
                          component={ServiceHistoryDetail}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ProductDetail"
                          component={ProductDetail}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="EditProfile"
                          component={EditProfile}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ManageAddresses"
                          component={ManageAddresses}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="AddAddress"
                          component={AddAddress}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ContactUs"
                          component={ContactUsScreen}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="AddNewMyDevice"
                          component={AddNewMyDevice}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="UserLicenseAgreement"
                          component={UserLicenseAgreement}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ResetPassword"
                          component={ResetPasswordScreen}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="ThankYou"
                          component={ThankYou}
                          options={{headerShown: false}}
                        />
                        <Stack.Screen
                          name="OrderHistory"
                          component={OrderHistory}
                          options={{headerShown: false}}
                        />
                      </>
                    )}
                  </>
                </Stack.Navigator>
              </BottomSheetProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </AddressProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default Routes;
