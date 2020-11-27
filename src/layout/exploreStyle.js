import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const exploreStyle = EStyleSheet.create({
  top: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '1rem',
  },
  input: {
    backgroundColor: colors.$bgInput,
    padding: '.8rem',
    borderRadius: '1rem',
  },
  card: {
    width: 150,
    height: 200,
    marginBottom: '1rem',
  },
  cardWrapper: {
    padding: '1.5rem',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: '1rem',
    marginBottom: '.5rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: colors.$primary,
    marginBottom: '.3rem',
  },
});

export default exploreStyle;
