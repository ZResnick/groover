import history from '../../history';

const initialState = {};

//this thunk will add the token tio firestore so I can access it elsewhere
export const addTokenToFirestore = token => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore.collection('spotifyToken').add({ token });
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

const authReducer = (state = initialState, action) => {
  return state;
};

export default authReducer;
