import * as functions from 'firebase-functions'
import {initializeApp} from 'firebase-admin'
var fb = functions.config().firebase
if (fb) {
    initializeApp(fb)
}
export * from 'firebase-functions'
