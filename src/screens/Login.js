import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// components
import Button from '../components/Button';
import TextInput from '../components/TextInput';

// configs
import colors from '../configs/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quer</Text>
      <View style={styles.bottom}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
        <Button text="Login" />
        <Text style={styles.newHere}>New Here? Signup</Text>
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
