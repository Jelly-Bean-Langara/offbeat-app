import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const navigatorStyle = EStyleSheet.create({
  pageHeader: {
    backgroundColor: colors.$lightBg,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  tabNav: {
    backgroundColor: colors.$neutral4,
  },
});

export default navigatorStyle;
