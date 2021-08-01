import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

// hooks
import useAuthContext from '../../contexts/Auth';
import useSwitch from '../../hooks/useSwitch';
import { useNavigation } from '@react-navigation/core';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

// components
import Button from '../../components/Button';

// configs
import colors from '../../configs/colors';
import NAVIGATION from '../../configs/navigation';

import api from '../../api';

export default function App() {
  const auth = useAuthContext();
  const isQRCodeModalOpen = useSwitch();
  const isTorchOn = useSwitch();
  const [enrolledStores, setEnrolledStores] = useState([]);
  const navigation = useNavigation();

  const onRead = (result) => {
    const splitData = result.data.split(':');
    if (splitData[0] !== 'quer') {
      return;
    }
    api.customers.queue.enqueue(splitData[1], auth.user);
    isQRCodeModalOpen.false();
  };

  const navigateToChat = (store) => {
    navigation.navigate(NAVIGATION.CHAT, {
      customerId: auth.user.id,
      customerName: store.name,
      storeId: store.id,
    });
  };

  useEffect(() => {
    const onQueueChange = (snapshot) => {
      const stores = [];
      snapshot.forEach((doc) => {
        stores.push({ id: doc.id, ...doc.data() });
      });
      setEnrolledStores(stores);
    };
    const unsubscribe = api.customers.queue.listen(auth.user.id, onQueueChange);
    return unsubscribe;
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Queue</Text>
          <TouchableOpacity onPress={auth?.functions.logout}>
            <Icon name="power-off" color={colors.primary} size={22} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.stores}
          contentContainerStyle={styles.storesContent}>
          {enrolledStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeCard}
              onPress={() => navigateToChat(store)}>
              <Text style={styles.storeTitle}>{store.name}</Text>
              <Text style={styles.storePhoneNumber}>{store.phoneNumber}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.bottom}>
          <Button
            text="Scan QR Code"
            icon="qrcode"
            onPress={isQRCodeModalOpen.true}
          />
        </View>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isQRCodeModalOpen.value}
        onRequestClose={isQRCodeModalOpen.false}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <QRCodeScanner
                onRead={onRead}
                flashMode={
                  isTorchOn.value ? RNCamera.Constants.FlashMode.torch : null
                }
                bottomContent={
                  <View style={styles.fdrow}>
                    <View style={styles.closeButton}>
                      <Button text="Toggle Torch" onPress={isTorchOn.toggle} />
                    </View>
                    <View style={styles.closeButton}>
                      <Button text="Close" onPress={isQRCodeModalOpen.false} />
                    </View>
                  </View>
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
    width: '100%',
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
  stores: {
    marginTop: 30,
    width: '100%',
  },
  storesContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeCard: {
    height: 70,
    backgroundColor: '#333',
    width: '90%',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  storeTitle: {
    fontSize: 18,
    color: colors.primary,
  },
  storePhoneNumber: {
    fontSize: 16,
    color: colors.placeholder,
  },
  bottom: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    width: '90%',
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#222',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 30,
    marginHorizontal: 10,
    width: '40%',
  },
  fdrow: {
    flexDirection: 'row',
  },
});
