import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';

// hooks
import { useNavigation } from '@react-navigation/native';
import useInput from '../../hooks/useInput';
import useSwitch from '../../hooks/useSwitch';

// firebase
import auth from '@react-native-firebase/auth';

// components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

// configs
import colors from '../../configs/colors';
import NAVIGATION from '../../configs/navigation';

export default function App() {
  const navigation = useNavigation();
  const email = useInput();
  const password = useInput();
  const confirmPassword = useInput();
  const isShopOwner = useSwitch();

  const navigateToSignup = () => {
    navigation.navigate(NAVIGATION.AUTH.LOGIN);
  };

  const onSubmit = () => {
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quer</Text>
      <View style={styles.bottom}>
        <TextInput
          placeholder="Email"
          value={email.value}
          onChangeText={email.set}
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          placeholder="Password"
          value={password.value}
          onChangeText={password.set}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword.value}
          onChangeText={confirmPassword.set}
          secureTextEntry={true}
        />
        <View style={styles.shopOwnerOption}>
          <Text style={styles.shopOwnerOptionText}>Shop Account</Text>
          <Switch
            value={isShopOwner.value}
            onChange={isShopOwner.toggle}
            trackColor={{ true: colors.primary }}
          />
        </View>
        <Button text="Signup" onPress={onSubmit} />
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.newHere}>Already a member? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: colors.primary,
    marginBottom: 300,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  newHere: {
    fontSize: 18,
    color: colors.placeholder,
    marginTop: 20,
    marginBottom: 20,
  },
  shopOwnerOption: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  shopOwnerOptionText: {
    color: colors.primary,
    fontSize: 22,
  },
});
