import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Store/Home';

// configs
import NAVIGATION from '../configs/navigation';

const StoreStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name={NAVIGATION.STORE.HOME} component={Home} />
    </StoreStack.Navigator>
  );
}
