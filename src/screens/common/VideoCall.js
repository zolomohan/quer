import React from 'react';
import AgoraUIKit from 'agora-rn-uikit';

export default function Conference(props) {
  const rtcProps = {
    appId: 'e004df68b67841a1b6ea7c08b7225814',
    channel: props.route.params.channel,
  };
  return <AgoraUIKit rtcProps={rtcProps} />;
}
