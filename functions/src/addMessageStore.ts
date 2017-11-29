import * as functions from './main'
import {store} from './store'

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
export const addMessageStore = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  var data = {
    "original" : original
  }
  store.collection('messages').add(data).then(() => {
    res.send(original)
  })
});