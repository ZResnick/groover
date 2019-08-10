import { combineReducers } from 'redux';
// import authReducer from './authReducer';
// import songReducer from './songReducer';
import { firestoreReducer } from 'redux-firestore'; //made for syncing firebase data to state

const rootReducer = combineReducers({
  // auth: authReducer,
  //songs: songReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
