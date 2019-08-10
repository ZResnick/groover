import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';
import Spotify from './Spotify';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

//spotify web api
import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();

export class AllSongs extends Component {
  componentDidMount() {
    if (this.props.tokens) {
      let token = this.props.tokens[0].token;
      spotifyApi.setAccessToken(token);
      this.getCurrentlyPlaying(token);
    }
  }

  getCurrentlyPlaying(token) {
    spotifyApi.getMyCurrentPlayingTrack(null, (err, data) => {
      console.log(data);
    });
  }

  render() {
    let { songs, tokens } = this.props;
    let pageSongs = songs && [...songs];
    let token = tokens && tokens[0];
    let orderedSongs =
      pageSongs && pageSongs.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
    return (
      <div>
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
        <div>{token && <Spotify />}</div>
      </div>
    );
  }
}

// mapState;
const mapStateToProps = state => {
  return {
    songs: state.firestore.ordered.Songs,
    tokens: state.firestore.ordered.spotifyToken,
  };
};

//use compose to connect connect and firestoreConnect together...
export default compose(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([
    { collection: 'Songs', orderBy: [['upvotes', 'desc']] },
    { collection: 'spotifyToken', orderBy: [['timestamp', 'desc']] },
  ])
)(AllSongs);
