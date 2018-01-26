import * as firebase from 'firebase'
let config = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'automart-service-repair.firebaseapp.com',
  databaseURL: 'https://automart-service-repair.firebaseio.com',
  projectId: 'automart-service-repair',
  storageBucket: 'automart-service-repair.appspot.com',
  messagingSenderId: '492909950313'
}
let a = firebase.initializeApp(config)
export default a
// console.log(firebase.database())
