import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const buttons = EStyleSheet.create({
  confirm: {
    backgroundColor: colors.$semanticPos,
  },
  confirmText: {
    color: colors.$neutral4,
    fontWeight: 'bold',
  },
  confirmTextAlt: {
    color: colors.$semanticPos,
    fontWeight: 'bold',
  },
  login: {
    backgroundColor: colors.$primary,
  },
  loginText: {
    color: colors.$neutral4,
    fontWeight: 'bold',
  },
  loginTextAlt: {
    color: colors.$primary,
    fontWeight: 'bold',
  },
  confirmAlt: {
    backgroundColor: colors.$secondary,
  },
  small: {
    padding: '.5rem',
    borderRadius: '.8rem',
  },
  fullSize: {
    flex: 1,
    textAlign: 'center',
    padding: '1.1rem',
    fontSize: '1.1rem',
  },
  plus: {
    marginRight: '1rem',
  },
});

export default buttons;
