import React, { useState, useEffect } from 'react';

// firebase
import auth from '@react-native-firebase/auth';

// routes
import AuthRoutes from './routes/Auth';
import CustomerRoutes from './routes/Customer';
import useAuthContext from './contexts/Auth';

export default function App() {
  const auth = useAuthContext();

  if (!auth.user) {
    return <AuthRoutes />;
  }

  return <CustomerRoutes />;
}
