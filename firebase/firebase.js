const admin = require('firebase-admin');

const serviceAccount = require(''); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '', // Replace with your Firebase project's database URL
});


module.exports = admin;
