import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const mapStyle = EStyleSheet.create({
  map: {
    height: '100%',
  },
  container: {
    position: 'absolute',
    margin: 0,
    top: '4rem',
    borderBottomWidth: 1,
    borderColor: colors.$neutral3,
    shadowOpacity: 0,
  },
  list: {
    position: 'absolute',
    top: 50,
    borderColor: '#dedede',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    left: -1,
    right: -1,
  },
  btn: {
    bottom: '6rem',
    right: '2rem',
    position: 'absolute',
    padding: '1rem',
    borderRadius: '1rem',
  },
});

export default mapStyle;
