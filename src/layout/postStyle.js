import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const postStyle = EStyleSheet.create({
  cover: {
    flex: 1,
    height: 200,
    marginLeft: '1rem',
    marginRight: '1rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    marginTop: '1rem',
  },
});

export default postStyle;
