import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const containers = EStyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.$neutral4,
  },
  topSafeArea: {
    backgroundColor: colors.$lightBg,
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: colors.$lightBg,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  whiteSpace: {
    flex: 1,
    height: 70,
  },
});

export default containers;
