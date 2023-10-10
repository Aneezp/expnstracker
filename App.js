/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {  useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Home';
import { RNGet } from './src/common/function';
import Dashboard from './src/dashboard';
import EntryScreen from './src/EntryScreen';
import Issues from './src/issues';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    checkLogged();
  }, []);
  const checkLogged = async () => {
    let result = await RNGet('api-key');
    if (result) { setisLogged(true); }
    else { setisLogged(false); }
  }
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'EntryScreen'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EntryScreen" component={EntryScreen} />
          <Stack.Screen name="Login" component={HomeScreen} options={{ animationTypeForReplace: 'push', statusBarAnimation: 'slide' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Issues" component={Issues} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;


