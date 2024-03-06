export var signedIn = true;
export var userId = null;

export function updateSignIn(boolean) {
  signedIn = boolean;
  console.log('sign in:', signedIn);
}