import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const helloworld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!\n\n")
})

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
admin.initializeApp(functions.config().firebase)
export const addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onWrite(event => {
  if (event == undefined) return;
  if (event.data == undefined) return;
  if (event.data.ref == undefined) return;
  if (event.data.ref.parent == undefined) return;
  if (event.params == undefined) return;
  
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return event.data.ref.parent.child('uppercase').set(uppercase);
});