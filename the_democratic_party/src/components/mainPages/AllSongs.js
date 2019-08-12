import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';
import Spotify from './Spotify';
import grooverPlaylist from './spotifyConfig';
import removeSong from '../../store/reducers/songReducer';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

//spotify web api
import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();

export class AllSongs extends Component {
  constructor() {
    super();
    this.getCurrentlyPlaying.bind(this);
  }

  componentDidUpdate() {
    if (this.props.tokens) {
      let token = this.props.tokens[0].token;
      spotifyApi.setAccessToken(token);
      this.getCurrentlyPlaying(token);
    }
  }

  //I cant get the information from get spotifyApi.getMyCurrentPlayingTrack to appear on state which made me have to go throught the madness below....

  getCurrentlyPlaying(token) {
    spotifyApi.getMyCurrentPlayingTrack(null, (err, data) => {
      let currentSong = data && data.item.name;
      let currentProgress = data && data.progress_ms;
      let songLength = data && data.item.duration_ms;
      let timeToEnd = songLength - currentProgress - 5000;
      setTimeout(async () => {
        let songs = this.props.songs;
        let pageSongs = songs && [...songs];
        let orderedSongs =
          pageSongs &&
          pageSongs.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
        let topSong = orderedSongs[0];
        console.log(
          `ADDING ${topSong.title} by ${topSong.artist} TO THE GROOVER PLAYLIST`
        );
        await spotifyApi.getPlaylist(
          grooverPlaylist,
          null,
          async (err, data) => {
            const snapshot = data && data.snapshot_id;
            let songs = data && data.tracks.items;
            let currentPosition =
              songs && songs.findIndex(song => song.track.name === currentSong);
            let indicesToDestroy = [];
            if (songs && songs.length) {
              for (let i = currentPosition + 1; i < songs.length; i++) {
                indicesToDestroy.push(i);
              }
            } else {
              indicesToDestroy.push(1);
            }
            await spotifyApi.removeTracksFromPlaylistInPositions(
              grooverPlaylist,
              indicesToDestroy,
              snapshot,
              (err, success) => {
                if (err) {
                  console.log('err', err);
                }
              }
            );
            await spotifyApi.addTracksToPlaylist(
              grooverPlaylist,
              [topSong.uri],
              { position: currentPosition + 1 },
              (err, data) => {
                if (err) {
                  console.log('err', err);
                }
              }
            );
          }
        );
      }, timeToEnd);
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
          <table className="container songList">
            <tbody>
              <tr>
                <th className="tableHeaders">Remove</th>
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
        <div className="player">{token && <Spotify />}</div>
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

const mapDispatchToProps = dispatch => ({
  removeSong: id => {
    dispatch(removeSong(id));
  },
});

//use compose to connect connect and firestoreConnect together...
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: 'Songs', orderBy: [['upvotes', 'desc']] },
    { collection: 'spotifyToken' },
  ])
)(AllSongs);
