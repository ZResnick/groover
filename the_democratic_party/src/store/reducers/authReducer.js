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
    let data = { token, timestamp: firestore.FieldValue.serverTimestamp() }; //adding a timestamp
    //making it so that I only ever store a single token in my database called currentToken
    await firestore
      .collection('spotifyToken')
      .doc('CurrentToken')
      .set(data);
    // history.push('/');
  } catch (err) {
    console.error(err);
  }
};

const authReducer = (state = initialState, action) => {
  return state;
};

export default authReducer;
