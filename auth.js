export var signedIn = false;
export var userId = null;

export function updateSignIn(boolean) {
  signedIn = boolean;
  console.log('sign in:', signedIn);
}


export function setUserID(id) {
  userId = id;
  console.log('user id:', userId);
}
