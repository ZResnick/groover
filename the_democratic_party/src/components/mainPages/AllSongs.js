import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';
import getAllSongs from '../../store/reducers/songReducer';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

export class AllSongs extends Component {
  render() {
    const { songs } = this.props;
    console.log(songs);
    return (
      <div className="allSongs container">
        <h3 className="center">All Songs</h3>
        <ul className="container">
          {songs &&
            songs.map(song => {
              return <SingleSong key={song.title} {...song} />;
            })}
        </ul>
      </div>
    );
  }
}

// mapDispatch;
const mapStateToProps = state => {
  console.log(state);
  return {
    songs: state.songs,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllSongs: () => {
    dispatch(getAllSongs());
  },
});

//use compose to connect connect and firestoreConnect together...
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Songs' }])
)(AllSongs);
