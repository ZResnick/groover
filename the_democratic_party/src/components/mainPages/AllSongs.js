import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

export class AllSongs extends Component {
  render() {
    const { songs } = this.props;
    // const orderedSongs =
    //   songs && songs.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
    return (
      <div className="allSongs container">
        <h3 className="center">All Songs</h3>
        <table className="container">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Run Time</th>
              <th>Votes</th>
            </tr>
            {songs &&
              songs.map(song => {
                return <SingleSong key={song.id} {...song} />;
              })}
          </tbody>
        </table>
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
  firestoreConnect([{ collection: 'Songs', orderBy: [['upvotes', 'desc']] }])
)(AllSongs);
