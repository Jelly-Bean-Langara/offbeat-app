import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const inputs = EStyleSheet.create({
  text: {
    width: '100% - 2rem',
    padding: '.8rem',
    backgroundColor: colors.$bgInput,
    marginLeft: '1rem',
    marginRight: '1rem',
    borderRadius: '1rem',
    marginTop: '2rem',
  },
  bigArea: {
    height: 130,
    padding: '1rem',
    paddingTop: '1rem',
  },
});

export default inputs;
