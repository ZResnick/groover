import history from '../../history';

const initialState = [
  { title: 'Wannabe', artist: 'The Spice Girls', album: 'Spice', length: 3.9 },
  {
    title: "I'm Not Willing",
    artist: 'Moby Grape',
    album: 'Longfrom',
    length: 2.75,
  },
  {
    title: 'Easy Love',
    artist: 'MSTRKRFT',
    album: 'Electric Feel',
    length: 3.25,
  },
]; //this will be an array of objects

//CONSTANTS:
const GOT_ALL_SONGS = 'GOT_ALL_SONGS';
const ADDED_A_SONG = 'ADDED_A_SONG';

//ACTION CREATORS
const gotAllSongs = songs => ({ type: GOT_ALL_SONGS, songs });
const addedASong = song => ({ type: ADDED_A_SONG, song });

//THUNKS
export const getAllSongs = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    //make asyn call > const { data } = await axios.get('/api/products');
    //dispatch(gotAllSongs(data));
  } catch (err) {
    console.error(err);
  }
};

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
    dispatch(addedASong(song));
  } catch (err) {
    console.error(err);
  }
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_SONGS:
      return state;
    case ADDED_A_SONG:
      return [...state, action.song];
    default:
      return state;
  }
};

export default songReducer;
