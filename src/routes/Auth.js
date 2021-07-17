// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';

// configs
import NAVIGATION from '../configs/navigation';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={NAVIGATION.AUTH.LOGIN} component={Login} />
      <AuthStack.Screen name={NAVIGATION.AUTH.SIGNUP} component={Signup} />
    </AuthStack.Navigator>
  );
}
