import * as functions from 'firebase-functions'
import {initializeApp} from 'firebase-admin'
initializeApp(functions.config().firebase)
export * from 'firebase-functions'
