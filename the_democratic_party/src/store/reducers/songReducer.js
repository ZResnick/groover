import history from '../../history';

const initialState = []; //this will be an array of objects

//CONSTANTS:
// const ADDED_A_SONG = 'ADDED_A_SONG';

//ACTION CREATORS
// const addedASong = song => ({ type: ADDED_A_SONG, song });

//THUNKS
export const addASong = song => async (
  dispatch,
  getState, //the firestore functions on line 38 WILL NOT WORK WITHOUT THIS GETSTATE!!!
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore(); //this is the call that gets us access to firestore:
    //gets us a reference to the Songs Collection and then adds a document using .add({document })
    await firestore.collection('Songs').add({ ...song });
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

//this route will need to find the song by the song id and increment the upvotes
export const upvote = (id, votes) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    const songToUpdate = await firestore.collection('Songs').doc(id);
    await songToUpdate.update({
      upvotes: votes + 1,
    });
    console.log(songToUpdate.upvotes);
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

//this route will need to find the song by the song id and decrement the upvotes
export const downvote = (id, votes) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    const songToUpdate = await firestore.collection('Songs').doc(id);
    await songToUpdate.update({
      upvotes: votes - 1,
    });
    console.log(songToUpdate.upvotes);
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default songReducer;
