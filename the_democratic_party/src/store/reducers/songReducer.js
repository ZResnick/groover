import history from '../../history';

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
    history.push('/adminPage');
  } catch (err) {
    console.error(err);
  }
};

export const removeSong = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection('Songs')
      .doc(id)
      .delete();
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
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export default addASong;
