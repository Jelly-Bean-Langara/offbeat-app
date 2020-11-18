import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const homeStyle = EStyleSheet.create({
  wrapper: {
    paddingTop: '1rem',
  },
  today: {
    marginLeft: '1rem',
    marginRight: '1rem',
    color: colors.$neutral1,
  },
  pageTitle: {
    fontSize: '2rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: colors.$primary,
  },
  callTo: {
    flex: 1,
    marginRight: '1rem',
    marginLeft: '1rem',
    backgroundColor: colors.$semanticPos,
    borderRadius: '1rem',
    marginBottom: '2rem',
    overflow: 'hidden',
  },
  callToTitle: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: colors.$neutral4,
    width: '60%',
    marginLeft: '1rem',
    marginTop: '3rem',
  },
  callToText: {
    lineHeight: '1.6rem',
    fontSize: '1.1rem',
    width: '60%',
    color: colors.$neutral4,
    marginLeft: '1rem',
    marginBottom: '1.5rem',
  },
  callToBg: {
    flex: 1,
    borderRadius: '1rem',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  divisor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  categoryTitle: {
    fontSize: '1.5rem',
    color: colors.$primary,
  },
  card: {
    width: 150,
    marginLeft: '1rem',
    height: 220,
  },
  'card:last-child': {
    marginRight: '1rem',
  },
  cardFigure: {
    width: '100%',
    height: 150,
    marginBottom: '.5rem',
    borderRadius: '1rem',
  },
  cardDescription: {
    height: 70,
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: colors.$primary,
    marginBottom: '.3rem',
  },
  cardDetails: {
    color: colors.$neutral1,
  },
  images: {
    borderRadius: '.5rem',
  },
});

export default homeStyle;
