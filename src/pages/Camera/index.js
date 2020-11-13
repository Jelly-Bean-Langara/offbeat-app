import CameraRoll from '@react-native-community/cameraroll';
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

// Styles
import { cameraStyle } from '../../layout';

const Camera = () => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    //  eslint-disable-next-line
    CameraRoll.save(data.uri);
  };

  return (
    <View>
      <RNCamera
        ref={cameraRef}
        style={cameraStyle.body}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <Button title="Snap" onPress={takePicture} />
    </View>
  );
};

export default Camera;
