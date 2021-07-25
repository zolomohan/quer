import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Switch } from 'react-native';

// hooks
import useSwitch from '../../hooks/useSwitch';
import useInput from '../../hooks/useInput';
import useAuthContext from '../../contexts/Auth';

// components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

// helpers
import api from '../../api';

// configs
import colors from '../../configs/colors';
import { USERTYPE } from '../../constants';

export default function CollectData() {
  const auth = useAuthContext();
  const isStoreOwner = useSwitch();

  // console.log(auth.user.uid);
  const name = useInput();
  const phoneNumber = useInput();

  const onSubmit = async () => {
    const data = {
      name: name.value,
      phoneNumber: phoneNumber.value,
    };
    if (isStoreOwner.value) {
      await api.stores.create(auth.user.data.uid, data);
      auth.functions.updateState({
        ...auth.user,
        ...data,
        type: USERTYPE.STORE,
      });
    } else {
      await api.customers.create(auth.user.data.uid, data);
      auth.functions.updateState({
        ...auth.user,
        ...data,
        type: USERTYPE.CUSTOMER,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fdrow}>
        <Text style={styles.question}>Are you a store owner?</Text>
        <Switch
          value={isStoreOwner.value}
          onChange={isStoreOwner.toggle}
          trackColor={{ true: colors.primary }}
        />
      </View>
      <TextInput
        placeholder={isStoreOwner.value ? 'Store Name' : 'Your Name'}
        value={name.value}
        onChangeText={name.set}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber.value}
        onChangeText={phoneNumber.set}
      />
      <View style={styles.bottom}>
        <Button text="Submit" onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    width: '100%',
  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  question: {
    color: colors.primary,
    fontSize: 18,
  },
  fdrow: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
});
