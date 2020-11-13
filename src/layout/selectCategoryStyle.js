import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const selectCategoryStyle = EStyleSheet.create({
  pageTitle: {
    fontSize: '1.8rem',
    paddingLeft: '2rem',
    fontWeight: 'bold',
    color: colors.$primary,
    width: '80%',
    marginTop: '1rem',
  },
  pageTitle2: {
    fontSize: '1.8rem',
    paddingLeft: '2rem',
    fontWeight: 'bold',
    color: colors.$primary,
    width: '80%',
  },
  pageTitleAlt: {
    color: colors.$secondary,
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  cardWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '50% - 2rem',
    height: 150,
    margin: '1rem',
    borderRadius: '1rem',
    borderWidth: 1,
    borderColor: colors.$neutral3,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    marginTop: '1.8rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1.1rem',
  },
});

export default selectCategoryStyle;
