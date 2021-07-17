import React, { useState, useEffect } from 'react';

// firebase
import auth from '@react-native-firebase/auth';

// routes
import AuthRoutes from './routes/Auth';
import CustomerRoutes from './routes/Customer';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  if (!user) {
    return <AuthRoutes />;
  }

  return <CustomerRoutes />;
}
