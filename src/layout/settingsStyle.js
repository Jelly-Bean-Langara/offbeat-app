import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const settingsStyle = EStyleSheet.create({

  settingsTitle: {
    fontFamily: 'Rubik-Bold',
    color: colors.$primary,
    fontSize: 24,
    textAlign: 'left',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginBottom: '.5rem',
    marginTop: '3rem'
  },

  containerInfoBtn: {
    backgroundColor: colors.$primary,
    margin: '2rem 1rem',
    borderRadius: '1rem',
    padding: '.5rem'
  },

  containerToggle: {
    backgroundColor: colors.$neutral3,
    marginLeft: '2rem',
    marginRight: '2rem',
    marginBottom: '2rem',
    borderRadius: '1rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  titleInfo: {
    fontFamily: 'Rubik-Medium',
    color: colors.$neutral2,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '1rem',
    marginTop: '1rem'
  },

  containerTitle: {
    flex: 1
  },

  toggleTitle: {
    fontFamily: 'Rubik-Regular',
    color: colors.$primary,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: '1rem',
  },

  containerLogOutBtn: {
    backgroundColor: colors.$neutral4,
    margin: '2rem',
    marginTop: '8rem',
    borderRadius: '1rem',
    padding: '.25rem',
    borderWidth: 3,
    borderColor: colors.$semanticNeg,
  },

  logOut: {
    fontFamily: 'Rubik-Medium',
    color: colors.$semanticNeg,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '1rem',
    marginTop: '1rem'
  }

});

export default settingsStyle;
