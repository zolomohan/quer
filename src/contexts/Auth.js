import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import api from '../api';
import { USERTYPE } from '../constants';

const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (_user) => {
      if (!_user) {
        return;
      }

      const customer = await api.customers.get(_user.uid);
      if (customer.exists) {
        setUser((c) => ({ ...c, ...customer.data, type: USERTYPE.CUSTOMER }));
        return;
      }

      const store = await api.stores.get(_user.uid);
      if (store.exists) {
        setUser((c) => ({ ...c, ...store.data, type: USERTYPE.STORE }));
        return;
      }

      setUser({ data: _user, type: USERTYPE.UNINITIALIZED });
    });
    return subscriber;
  }, []);

  const signin = (email, password) => {
    auth().signInWithEmailAndPassword(email, password).catch(console.log);
  };

  const signup = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  };

  const logout = () => {
    auth().signOut();
  };

  const value = {
    user,
    functions: {
      signin,
      signup,
      logout,
      updateState: setUser,
    },
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default function useAuthContext() {
  return useContext(AuthContext);
}
