import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import * as Keychain from 'react-native-keychain';

/* NOTE: Credentials should be fetched only if isLogged status is true */

// store credentials and login state:{true}
async function StoreCredentials(user_id, token, name, email, picture) {
  // Store the credentials
  try {
    // store credentials with encryption
    await Keychain.setGenericPassword(user_id, token);
    // store insensitive
    await AsyncStorage.setItem('ifLoggedIn', "true");
    await AsyncStorage.setItem('user_name', name);
    await AsyncStorage.setItem('user_email', email);
    await AsyncStorage.setItem('user_picture', picture);
    Toast.show(`Hi ${name}. You have successfully logged in with ${email}`);
    return true;
  } catch (e) {
    return false;
  }
}

export default ( StoreCredentials );
