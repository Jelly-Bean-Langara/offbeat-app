import EStyleSheet from 'react-native-extended-stylesheet';

const cameraStyle = EStyleSheet.create({
  body: {
    width: '100%',
    height: 400,
  },
  change: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
  },
  buttonsArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '1rem',
  },
});

export default cameraStyle;
