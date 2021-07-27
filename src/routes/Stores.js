import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Store/Home';
import Chat from '../screens/common/Chat';
import VideoCall from '../screens/common/VideoCall';

// configs
import NAVIGATION from '../configs/navigation';

const StoreStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <StoreStack.Navigator screenOptions={{ headerShown: false }}>
      <StoreStack.Screen name={NAVIGATION.HOME} component={Home} />
      <StoreStack.Screen name={NAVIGATION.CHAT} component={Chat} />
      <StoreStack.Screen name={NAVIGATION.VIDEO} component={VideoCall} />
      <StoreStack.Screen name={NAVIGATION.AUDIO} component={VideoCall} />
    </StoreStack.Navigator>
  );
}
