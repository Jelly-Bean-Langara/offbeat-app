import EStyleSheet from 'react-native-extended-stylesheet';

const cameraRollStyle = EStyleSheet.create({
  wrapper: {
    width: '100%',
    height: 320,
  },
  inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pictureBtn: {
    height: 100,
    width: '25%',
  },
  picture: {
    width: '100%',
    height: 100,
  },
});

export default cameraRollStyle;
