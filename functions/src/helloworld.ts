import * as functions from './main'

export const helloworld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!\n\n")
  })
  