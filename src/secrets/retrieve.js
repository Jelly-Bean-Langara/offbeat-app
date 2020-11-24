import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Check if user is logged in, if true returns credentials */

// get credentials and login state
async function RetrieveCredentials() {
  try {

    // check if user logged in or not
    const value = await AsyncStorage.getItem('ifLoggedIn')
    // if true then retrieve credentials
    if (value !== null && value == "true") {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return ({ user_id: credentials.username , token: credentials.password });
      } else {
        console.log('No credentials stored');
        return false;
      }
    } else {
      console.log('user not logged in');
      return false;
    }

  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return false;
  }
}

export default (RetrieveCredentials);
