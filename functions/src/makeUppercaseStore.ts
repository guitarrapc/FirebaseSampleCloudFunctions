import * as functions from './main'
import {store} from './store'

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
export const makeUppercaseStore = functions.firestore
.document('/messages/{postId}/original')
.onWrite(event => {
  if (event == undefined) return;
  if (event.data == undefined) return;
  if (event.data.ref == undefined) return;
  if (event.data.ref.parent == undefined) return;
  if (event.params == undefined) return;
  
  const postId = event.params.postId
  
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.data();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();

  let docRef = store.doc('messages').collection(postId).doc('original')
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return docRef.get().then(() => {
    return docRef.set({
      'uppercase' : uppercase
    }, {'merge' :true});  
  })
});
