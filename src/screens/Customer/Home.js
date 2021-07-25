import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

// components
import Button from '../../components/Button';

// configs
import colors from '../../configs/colors';
import useAuthContext from '../../contexts/Auth';
import useSwitch from '../../hooks/useSwitch';

export default function App() {
  const auth = useAuthContext();
  const isQRCodeModalOpen = useSwitch();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Queue</Text>
          <TouchableOpacity onPress={auth?.functions.logout}>
            <Icon name="power-off" color={colors.primary} size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
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
              <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                  <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>
                      wikipedia.org/wiki/QR_code
                    </Text>{' '}
                    on your computer and scan the QR code.
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                  </TouchableOpacity>
                }
              />
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
    backgroundColor: '#00000077',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
