/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneNumber from './src/screens/authentication/PhoneNumber';
import VerifyCode from './src/screens/authentication/VerifyCode';
import Authenticated from './src/screens/authentication/Authenticated';
import HomeScreen from './src/screens/HomeScreen';
import ServiceLocation from './src/screens/ServiceLocation';
import LocationScreen from './src/screens/LocationScreen';
import SearchHistory from './src/screens/SearchHistory';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="phoneNumber">
        <Stack.Screen
          name="phoneNumber"
          component={PhoneNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyCode"
          component={VerifyCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="authenticated"
          component={Authenticated}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServiceLocation"
          component={ServiceLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="locationHome"
          component={LocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="searchHistory"
          component={SearchHistory}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
