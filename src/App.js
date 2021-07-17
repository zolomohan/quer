import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import colors from './configs/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quer</Text>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#3ba29499"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#3ba29499"
        />
        <View style={styles.button}>
          <Text>Login</Text>
        </View>
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
  },
  title: {
    fontSize: 50,
    color: '#3ba294',
    marginBottom: 200,
    textTransform: 'uppercase',
  },
  input: {
    width: 350,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3ba294',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3ba294',
    height: 50,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
