const firebase = require('./firebase');

const auth = firebase.auth();

const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const user = await auth.createUser({
      email,
      password,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUpWithEmailAndPassword
};
