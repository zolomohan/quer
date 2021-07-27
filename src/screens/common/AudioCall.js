import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

// Hooks
import { useNavigation } from '@react-navigation/native';

// Libraries
import RtcEngine from 'react-native-agora';

// Config and Constants
import colors from '../../configs/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const secondsToHoursMinutesSeconds = (seconds) => {
  return {
    hours: `0${(seconds / 3600).toFixed(0)}`.slice(-2),
    minutes: `0${((seconds % 3600) / 60).toFixed(0)}`.slice(-2),
    seconds: `0${((seconds % 3600) % 60).toFixed(0)}`.slice(-2),
  };
};

function AudioCall(props) {
  let engine = useRef();
  const navigation = useNavigation();
  const appId = 'e004df68b67841a1b6ea7c08b7225814';
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTimer((c) => c + 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const init = async () => {
    engine.current = await RtcEngine.create(appId);
    engine.current.disableVideo();
    engine.current.addListener('JoinChannelSuccess', (uid, state) => {
      console.log('Join Channel Success');
    });
  };

  const startCall = async () => {
    await engine.current.joinChannel(null, props.route.params.channel, null, 0);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }
    init().then(startCall);

    return () => {
      engine.current.destroy();
    };
  }, []);

  const time = secondsToHoursMinutesSeconds(timer);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.callerName}>{props.route.params.name}</Text>
        <Text
          style={
            styles.timer
          }>{`${time.hours}:${time.minutes}:${time.seconds}`}</Text>

        <TouchableOpacity
          style={[styles.icon, styles.endCall]}
          onPress={navigation.goBack}>
          <Icon name="phone-alt" color="#fff" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AudioCall;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  callerName: {
    fontSize: 35,
    color: '#fff',
    // marginBottom: 400,
  },
  timer: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20,
  },
  icon: {
    fontSize: 25,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
  },
  endCallWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    // overflow: 'hidden',
  },
  endCall: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    borderRadius: 100,
    margin: 30,
  },
});
