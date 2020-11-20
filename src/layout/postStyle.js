import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const postStyle = EStyleSheet.create({
  cover: {
    flex: 1,
    height: 200,
    margin: '1rem',
    overflow: 'hidden',
    borderRadius: '1rem',
  },
  postMoment: {
    margin: '1rem',
  },
  date: {
    fontSize: '1.2rem',
    color: colors.$primary,
  },
  location: {
    color: colors.$neutral1,
  },
  description: {
    marginBottom: '1.5rem',
    fontSize: '1.05rem',
  },
  locationArea: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '.5rem',
    marginBottom: '1rem',
  },
  coverBody: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignContent: 'center',
    justifyContent: 'flex-end',
    padding: '1rem',
  },
  coverTextCat: {
    color: colors.$neutral4,
    fontSize: '1.3rem',
    marginBottom: '.6rem',
  },
  coverTextTitle: {
    color: colors.$neutral4,
    fontSize: '2rem',
  },
});

export default postStyle;
