import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

export class AllSongs extends Component {
  render() {
    const { songs } = this.props;
    return (
      <div className="allSongs container">
        <h3 className="center">All Songs</h3>
        <ul className="container">
          {songs &&
            songs.map(song => {
              return <SingleSong key={song.id} {...song} />;
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
    songs: state.firestore.ordered.Songs,
  };
};

//use compose to connect connect and firestoreConnect together...
export default compose(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'Songs' }])
)(AllSongs);
