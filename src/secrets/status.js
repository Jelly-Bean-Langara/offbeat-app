import AsyncStorage from '@react-native-async-storage/async-storage';

// NOTE: in case only want to check if user is logged in or not

// check if user is logged in
async function CheckIfLoggedIn() {
  try {
    const value = await AsyncStorage.getItem('ifLoggedIn');
    if (value !== null && value === 'true') {
      return true;
    }
  } catch (e) {
    return false;
  }
}

export default CheckIfLoggedIn;
