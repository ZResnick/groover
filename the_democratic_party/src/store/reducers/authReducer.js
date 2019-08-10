//import history from '../../history';

const initialState = {};

//this thunk will add the token to firestore so I can access it elsewhere,. namely in my allSongs component
export const addTokenToFirestore = token => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    let data = { token, timestamp: firestore.FieldValue.serverTimestamp() }; //adding a timestamp so I can aleways grab the most recent token...
    await firestore.collection('spotifyToken').add(data);
    // history.push('/');
  } catch (err) {
    console.error(err);
  }
};

const authReducer = (state = initialState, action) => {
  return state;
};

export default authReducer;
