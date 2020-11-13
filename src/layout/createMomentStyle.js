import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './colors';

const createMomentStyle = EStyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  location: {
    width: 100,
    backgroundColor: colors.$semanticPosAlt,
    padding: '.2rem',
    borderRadius: '1rem',
  },
  locationText: {
    textAlign: 'center',
    color: colors.$primary,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  horizontalScroll: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
    flexGrow: 0,
  },
  guides: {
    backgroundColor: colors.$primary,
    height: 25,
    justifyContent: 'center',
    paddingLeft: '.6rem',
    paddingRight: '.6rem',
    marginRight: '1rem',
    borderRadius: '1rem',
  },
  guidesText: {
    color: colors.$neutral4,
  },
  bottom: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  saveMomentBtn: {
    width: '70%',
    borderRadius: '1rem',
  },
  saveMomentText: {
    textAlign: 'center',
    padding: '1.2rem',
    fontSize: '1.1rem',
  },
  camera: {
    justifyContent: 'center',
    width: '20%',
    alignItems: 'center',
  },
  selectedPicturesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingTop: '1rem',
  },
  selectedPictureBtn: {
    width: 80,
    height: 80,
    marginBottom: '1rem',
  },
  selectedPicture: {
    width: 80,
    height: 80,
    borderRadius: '1rem',
  },
});

export default createMomentStyle;
