import * as functions from './main'
import * as firestore from './store'
import { DocumentData } from '@google-cloud/firestore';

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
export const makeUppercaseStore = functions.firestore.document('/messages/{documentId}')
.onCreate(event => {
  if (event === undefined) return;
  if (event.params === undefined) return;

  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.data().original;
  console.log('Uppercasing', event.params.documentId, original);
  const uppercase = original.toUpperCase();

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an 'uppercase' sibling in the Realtime Database returns a Promise.
  return event.data.ref.set({uppercase}, {merge: true});
});