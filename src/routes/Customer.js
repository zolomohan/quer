import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Customer/Home';

// configs
import NAVIGATION from '../configs/navigation';

const CustomerStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name={NAVIGATION.CUSTOMER.HOME} component={Home} />
    </CustomerStack.Navigator>
  );
}
