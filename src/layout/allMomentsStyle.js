import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const allMomentsStyle = EStyleSheet.create({
  cover: {
    height: 230,
    marginLeft: '1rem',
    marginRight: '1rem',
    justifyContent: 'flex-end',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginBottom: '2rem',
    padding: '2rem',
  },
  body: {
    height: '100%',
  },
  title: {
    fontSize: '2rem',
    color: colors.$neutral4,
  },
  moment: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '1.5rem',
  },
  dateOne: {
    fontSize: '1.2rem',
    color: colors.$primary,
  },
  dateTwo: {
    fontSize: '1rem',
    color: colors.$primary,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  btnText: {
    textAlign: 'center',
    fontSize: '1.1rem',
  },
  big: {
    padding: '1.2rem',
    borderRadius: '1rem',
    width: '45%',
    alignSelf: 'center',
  },
  scroll: {
    maxHeight: 460,
  },
});

export default allMomentsStyle;
