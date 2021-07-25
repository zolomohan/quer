import React from 'react';

// routes
import AuthRoutes from './routes/Auth';
import CustomerRoutes from './routes/Customer';
import CollectData from './screens/common/CollectData';

import useAuthContext from './contexts/Auth';
import { USERTYPE } from './constants';

export default function App() {
  const auth = useAuthContext();

  if (!auth.user) {
    return <AuthRoutes />;
  }

  if (auth.user.type === USERTYPE.UNINITIALIZED) {
    return <CollectData />;
  }

  return <CustomerRoutes />;
}
