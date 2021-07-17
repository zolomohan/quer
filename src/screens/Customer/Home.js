import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// hooks
import { useNavigation } from '@react-navigation/native';

// firebase
import auth from '@react-native-firebase/auth';

// components
import Button from '../../components/Button';

// configs
import colors from '../../configs/colors';
import NAVIGATION from '../../configs/navigation';

export default function App() {
  const navigation = useNavigation();

  const onSubmit = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.bottom}>
        <Button text="Logout" onPress={onSubmit} />
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
