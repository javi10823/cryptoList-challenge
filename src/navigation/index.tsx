import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import {MainStackRoutes} from './routes';
import HomeScreen from '../screens/Home';
import ChartScreen from '../screens/Chart';
import { MainPage } from '../screens/Main';

const MainStack = createNativeStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name={MainStackRoutes.MainScreen}
        component={MainPage}
        options={{
          title: 'Loading',
        }}
      />
      <MainStack.Screen
        name={MainStackRoutes.LoginScreen}
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <MainStack.Screen
        name={MainStackRoutes.HomeScreen}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <MainStack.Screen
        name={MainStackRoutes.ChartScreen}
        component={ChartScreen}
        options={{
          title: 'Chart',
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);
