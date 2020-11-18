import EStyleSheet from 'react-native-extended-stylesheet';

const createPostStyle = EStyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentBg: {
    flex: 1,
    height: 350,
    alignSelf: 'center',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

export default createPostStyle;
