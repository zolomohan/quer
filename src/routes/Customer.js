import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Customer/Home';
import Chat from '../screens/common/Chat';
import VideoCall from '../screens/common/VideoCall';

// configs
import NAVIGATION from '../configs/navigation';

const CustomerStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name={NAVIGATION.HOME} component={Home} />
      <CustomerStack.Screen name={NAVIGATION.CHAT} component={Chat} />
      <CustomerStack.Screen name={NAVIGATION.VIDEO} component={VideoCall} />
    </CustomerStack.Navigator>
  );
}
