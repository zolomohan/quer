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
import useSwitch from '../../hooks/useSwitch';
import useAuthContext from '../../contexts/Auth';
import { useNavigation } from '@react-navigation/core';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';

// components
import Button from '../../components/Button';

// configs
import colors from '../../configs/colors';
import NAVIGATION from '../../configs/navigation';

// helpers
import api from '../../api';

export default function App() {
  const auth = useAuthContext();
  const navigation = useNavigation();
  const isQRCodeModalOpen = useSwitch();

  const [enrolledCustomers, setEnrolledCustomers] = useState([]);

  const onNext = () => {
    api.stores.queue.next(enrolledCustomers[0].id, auth.user.id);
  };

  const navigateToChat = (id) => {
    console.log({
      customerId: id,
      storeId: auth.user.id,
    });
    navigation.navigate(NAVIGATION.STORE.CHAT, {
      customerId: id,
      storeId: auth.user.id,
    });
  };

  useEffect(() => {
    const onQueueChange = (snapshot) => {
      const stores = [];
      snapshot.forEach((doc) => {
        stores.push({ id: doc.id, ...doc.data() });
      });
      setEnrolledCustomers(stores);
    };
    const unsubscribe = api.stores.queue.listen(auth.user.id, onQueueChange);
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
          {enrolledCustomers.map((customer) => (
            <TouchableOpacity
              key={customer.id}
              style={styles.storeCard}
              onPress={() => navigateToChat(customer.id)}>
              <Text style={styles.storeTitle}>{customer.name}</Text>
              <Text style={styles.storePhoneNumber}>
                {customer.phoneNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.bottom}>
          {enrolledCustomers.length > 0 && (
            <Button
              text="Next"
              icon="chevron-right"
              containerStyle={{ marginBottom: 20 }}
              onPress={onNext}
            />
          )}
          <Button
            text="Show QR Code"
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
            <View style={styles.qrView}>
              <QRCode size={250} value={`quer:${auth?.user?.id}`} />
            </View>
            <View style={styles.closeButton}>
              <Button text="Close" onPress={isQRCodeModalOpen.false} />
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
    bottom: 50,
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
  qrView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    width: '100%',
  },
});
