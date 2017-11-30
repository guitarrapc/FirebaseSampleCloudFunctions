import * as functions from './main'

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onWrite(async event => {
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
  await event.data.ref.parent.child('uppercase').set(uppercase);
});