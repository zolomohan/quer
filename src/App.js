import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// firebase
import auth from '@react-native-firebase/auth';

// routes
import AuthRoutes from './routes/Auth';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  if (!user) {
    return <AuthRoutes />;
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
