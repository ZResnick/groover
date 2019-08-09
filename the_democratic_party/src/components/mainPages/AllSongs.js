import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

export class AllSongs extends Component {
  render() {
    let { songs } = this.props;
    let pageSongs = songs && [...songs];
    let orderedSongs =
      pageSongs && pageSongs.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
    console.log(orderedSongs);
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
              orderedSongs.map(song => {
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
