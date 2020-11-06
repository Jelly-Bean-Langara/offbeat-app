import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const inputs = EStyleSheet.create({
  text: {
    width: '100%',
    padding: '.5rem',
    backgroundColor: colors.$neutral3,
    marginLeft: '1rem',
    marginRight: '1rem',
  },
});

export default inputs;
