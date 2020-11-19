import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const personalStyle = EStyleSheet.create({

  persInfoTitle: {
    fontFamily: 'Rubik-Bold',
    color: colors.$primary,
    fontSize: 24,
    textAlign: 'left',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginBottom: '2rem',
    marginTop: '3rem'
  },

  formTitle: {
    fontFamily: 'Rubik-Regular',
    color: colors.$primary,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: '2rem',
    marginBottom: '.75rem'
  },

  containerForm: {
    backgroundColor: colors.$neutral3,
    marginLeft: '2rem',
    marginRight: '2rem',
    marginBottom: '1.25rem',
    borderRadius: '1rem',
    paddingLeft: '1rem'
  },

  containerFormBig: {
    backgroundColor: colors.$neutral3,
    marginLeft: '2rem',
    marginRight: '2rem',
    marginBottom: '2rem',
    borderRadius: '1rem',
    paddingBottom: '4rem',
    paddingLeft: '1rem'
  },

  containerSigntBtn: {
    backgroundColor: colors.$neutral4,
    margin: '2rem',
    marginTop: '2rem',
    borderRadius: '1rem',
    padding: '.25rem',
    borderWidth: 3,
    borderColor: colors.$semanticNeg,
  },

  signUp: {
    fontFamily: 'Rubik-Medium',
    color: colors.$semanticNeg,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '1rem',
    marginTop: '1rem'
  }

});

export default personalStyle;
