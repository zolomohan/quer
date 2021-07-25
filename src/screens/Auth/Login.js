import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// hooks
import { useNavigation } from '@react-navigation/native';
import useInput from '../../hooks/useInput';
import useAuthContext from '../../contexts/Auth';

// components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

// configs
import colors from '../../configs/colors';
import NAVIGATION from '../../configs/navigation';

export default function App() {
  const auth = useAuthContext();
  const navigation = useNavigation();
  const email = useInput();
  const password = useInput();

  const navigateToSignup = () => {
    navigation.navigate(NAVIGATION.AUTH.SIGNUP);
  };

  const onSubmit = () => {
    auth.functions.signin(email.value, password.value);
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
          autoComplete="password"
          secureTextEntry={true}
        />
        <Button text="Login" onPress={onSubmit} />
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.newHere}>New Here? Signup</Text>
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
});
