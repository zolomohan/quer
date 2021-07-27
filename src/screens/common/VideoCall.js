import React from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/core';

export default function Conference(props) {
  const navigation = useNavigation();
  const rtcProps = {
    appId: 'e004df68b67841a1b6ea7c08b7225814',
    channel: props.route.params.channel,
  };
  const callbacks = {
    EndCall: () => {
      navigation.goBack();
    },
  };
  return <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />;
}
