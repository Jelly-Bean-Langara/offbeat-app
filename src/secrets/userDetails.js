import AsyncStorage from '@react-native-async-storage/async-storage';


async function UserDetails() {
  try {
    const user_name = await AsyncStorage.getItem('user_name');
    const user_email = await AsyncStorage.getItem('user_email');
    const user_picture = await AsyncStorage.getItem('user_picture');
    return ({"user_name":user_name, "user_email": user_email, "user_picture": user_picture})
  } catch (e) {
    return ({});
  }
}

export default (UserDetails);
