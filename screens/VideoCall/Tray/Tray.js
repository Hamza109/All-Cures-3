import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {logDailyEvent} from '../utils';
import {DailyCall} from '@daily-co/react-native-daily-js';
import {useCallObject} from '../useCallObject';
import theme from '../theme';
import TrayButton from '../TrayButton/TrayButton';
import {useOrientation, Orientation} from '../useOrientation';

function getStreamStates(callObject) {
  let isCameraMuted = false,
    isMicMuted = false,
    isShareScreenOff = false;

  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
    isShareScreenOff = !localParticipant.screen;
  }

  return [isCameraMuted, isMicMuted, isShareScreenOff];
}

export const TRAY_HEIGHT = 90;

const Props = {
  onClickLeaveCall: () => {},
  disabled: false,
};
const Tray = ({disabled, onClickLeaveCall}) => {
  const callObject = useCallObject();
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isShareScreenOff, setShareScreenOff] = useState(false);
  const orientation = useOrientation();

  const toggleCamera = useCallback(() => {
    callObject?.setLocalVideo(isCameraMuted);
  }, [callObject, isCameraMuted]);

  const toggleMic = useCallback(() => {
    callObject?.setLocalAudio(isMicMuted);
  }, [callObject, isMicMuted]);

  const toggleScreenShare = useCallback(() => {
    if (isShareScreenOff) {
      callObject?.startScreenShare();
    } else {
      callObject?.stopScreenShare();
    }
  }, [callObject, isShareScreenOff]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    const handleNewParticipantsState = event => {
      event && logDailyEvent(event);
      const [cameraMuted, micMuted, shareScreenOff] =
        getStreamStates(callObject);
      setCameraMuted(cameraMuted);
      setMicMuted(micMuted);
      setShareScreenOff(shareScreenOff);
    };

    handleNewParticipantsState();

    callObject.on('participant-updated', handleNewParticipantsState);

    return function cleanup() {
      callObject.off('participant-updated', handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <View
      style={[
        styles.containerBase,
        orientation === Orientation.Portrait
          ? styles.containerPortrait
          : styles.containerLandscape,
      ]}>
      <View
        style={
          orientation === Orientation.Portrait
            ? styles.controlsPortrait
            : styles.controlsLandscape
        }>
        <TrayButton
          disabled={disabled}
          onPress={toggleMic}
          muted={isMicMuted}
          text={isMicMuted ? 'Unmute' : 'Mute'}
          type="mic"
        />
        <TrayButton
          disabled={disabled}
          onPress={toggleCamera}
          muted={isCameraMuted}
          text={isCameraMuted ? 'Turn on' : 'Turn off'}
          type="camera"
        />
        {/* <TrayButton
          disabled={disabled}
          onPress={toggleScreenShare}
          muted={isShareScreenOff}
          text={isShareScreenOff ? 'Start' : 'Stop'}
          type="screenShare"
        /> */}
      </View>
      <TrayButton
        disabled={disabled}
        onPress={onClickLeaveCall}
        text="Leave"
        type="leave"
      />
    </View>
  );
};

export default Tray;

const styles = StyleSheet.create({
  containerBase: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.greyLight,
    borderTopColor: theme.colors.grey,
  },
  containerPortrait: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  containerLandscape: {
    height: '100%',
    position: 'absolute',
    right: 0,
    flexDirection: 'column-reverse',
    borderLeftWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  controlsPortrait: {
    flexDirection: 'row',
  },
  controlsLandscape: {
    flexDirection: 'column-reverse',
  },
});
