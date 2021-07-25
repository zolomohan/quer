import React from 'react';
import App from './App';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './contexts/Auth';

export default function Root() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
