import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';

// components
import Button from '../../components/Button';

// configs
import colors from '../../configs/colors';
import useAuthContext from '../../contexts/Auth';

export default function App() {
  const auth = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Queue</Text>
        <TouchableOpacity onPress={auth?.functions.logout}>
          <Icon name="power-off" color={colors.primary} size={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Button text="Show QR Code" icon="qrcode" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 30,
    color: colors.primary,
    paddingVertical: 15,
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
