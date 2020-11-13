import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const profileStyle = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  userName: {
    fontFamily: 'Rubik-Bold',
    color: colors.$primary,
    fontSize: 24,
    textAlign: 'center',
    marginTop: '1rem'
  },

  userDescription: {
    fontFamily: 'Rubik-Regular',
    color: colors.$neutral1,
    fontSize: 16,
    textAlign: 'center',
    marginTop: '.5rem'
  },

  image: {
    display: 'flex',
    flex: 1,
    minWidth: undefined,
    minHeight: 250
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
    top: '9rem',
    right: '-6.5rem'
  },

  containerUserSum: {
    marginTop: '6rem'
  },

  profileBtn: {
    flex: 1,
    marginTop: '1.75rem',
    marginRight: '2rem',
    marginLeft: '2rem',
    backgroundColor: colors.$semanticPos,
    borderRadius: '1rem',
    marginBottom: '2rem',
    overflow: 'hidden',
  },

  journalsBtn: {
    fontSize: '1.3rem',
    marginBottom: '1.15rem',
    fontFamily: 'Rubik-Bold',
    color: colors.$neutral4,
    width: '45%',
    marginLeft: '1.5rem',
    marginTop: '1.15rem',
  },

  summaryProfile: {
    fontFamily: 'Rubik-Regular',
    color: colors.$primary,
    fontSize: 20,
    textAlign: 'left',
    marginLeft: '2.5rem'
  },

  bkgSummary: {
    backgroundColor: colors.$neutral2,
    margin: '2rem',
    borderRadius: '1rem',
    marginTop: '1rem'
  },

  containerContries: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row'
  },

  countriesImage: {
    width: 70,
    height: 70,
    borderRadius: '.75rem',
    marginRight: '1rem'
  },

  titleCountries: {
    color: colors.$primary,
    flex: 1
  },

  numberCountries: {
    color: colors.$primary,
    fontSize: 18,
    fontFamily: 'Rubik-Bold'
  },

  containerMoments: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row'
  },

  momentsImage: {
    width: 70,
    height: 70,
    borderRadius: '.75rem',
    marginRight: '1rem'
  },

  titleMoments: {
    color: colors.$primary,
    flex: 1
  },

  numberMoments: {
    fontSize: 18,
    color: colors.$primary,
    fontFamily: 'Rubik-Bold'
  },

  containerTrips: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row'
  },

  tripsImage: {
    width: 70,
    height: 70,
    borderRadius: '.75rem',
    marginRight: '1rem'
  },

  titleTrips: {
    color: colors.$primary,
    flex: 1
  },

  numberTrips: {
    fontSize: 18,
    color: colors.$primary,
    fontFamily: 'Rubik-Bold'
  }
});

export default profileStyle;
