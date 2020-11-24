import Toast from 'react-native-simple-toast';

/* extract the user id, token, name, email */

function ExtractInfo (url) {

  if (url == "") {
    Toast.show(`Something went wrong!`);
    return false;
  }

  let user_id, token, name, email, user_picture
  let regex = /[?&]([^=#]+)=([^&#]*)/g, match
  while (match = regex.exec(url)) {
    // getting values here

    if (match[1] == "refresh_token") token = match[2]
    else if (match[1] == "user_id") user_id = match[2]
    else if (match[1] == "name") name = match[2]
    else if (match[1] == "email") email = match[2]
    else if (match[1] == "user_picture") user_picture = match[2]

  }

  if (user_id == "" || token == "") {
    Toast.show(`Something went wrong!`);
    return false;
  }

  // return values
  return ({"user_id": user_id, "token": token, "name": name, "email": email, "picture": user_picture});

}

export default (ExtractInfo);
