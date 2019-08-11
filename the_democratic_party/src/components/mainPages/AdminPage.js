import React, { Component } from 'react';
import { addASong } from '../../store/reducers/songReducer';
import { connect } from 'react-redux';
import Spotify from './Spotify';

//connect certain compomnents with the firestore using the firestoreConnect and compose at the bottom of this file:
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      artist: '',
      album: '',
      length: '',
      token: '',
    };

    this.handleChange = this.handelChange.bind(this);
    this.handleSubmit = this.handelSubmit.bind(this);
  }

  componentDidMount() {
    let _token = this.props.token && this.props.token;
    if (_token) {
      // Set token
      this.setState({
        token: _token.token,
      });
      spotifyApi.setAccessToken(_token.token);
    }
  }

  handelChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    spotifyApi.searchTracks(this.state.title, null, (err, data) => {
      //could put a utility feature here to filter songs by track and artist but going to simplest option first, taking rhe first song
      let firstSong = data.tracks.items[0];
      let songToAdd = {
        title: firstSong.name,
        artist: firstSong.artists[0].name,
        album: firstSong.album.name,
        length: firstSong.duration_ms,
        upvotes: 0,
        songId: firstSong.id,
        uri: firstSong.uri,
      };
      this.props.addASong(songToAdd);
    });
    this.setState({
      title: '',
      artist: '',
      album: '',
      length: '',
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Add a Song By Title:</h5>
            <div className="input-field">
              <label htmlFor="title">Song Title</label>
              <input
                type="text"
                id="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Add Song</button>
            </div>
          </form>
        </div>
        <Spotify className="spotifyPlayer" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addASong: song => {
    dispatch(addASong(song));
  },
});

const mapStateToProps = state => {
  return {
    token: state.firestore.ordered.spotifyToken,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'spotifyToken' }])
)(AdminPage);
