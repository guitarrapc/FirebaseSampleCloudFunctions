import * as functions from './main'
import {store} from './store'

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
export const addMessageStore = functions.https.onRequest(async (req, res) => {
  try{
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var data = {
      "original" : original
    }
    let writeResult = await store.collection('messages').add(data);
    res.json({resule : `Message with ID: ${writeResult.id} added.`});
  } catch (err) {
    console.error(`failed to put message into store`, err);
    res.status(504).json(err);
  }
});