import React, { Component } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './spotifyConfig';
import hash from './hash';
import Player from './Player';
import { addTokenToFirestore } from '../../store/reducers/authReducer';
import { connect } from 'react-redux';

class Spotify extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: '' }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      },
      is_playing: 'Paused',
      progress_ms: 0,
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
      this.playThisSong(_token);
      this.viewDevices(_token);
      this.props.addTokenToFirestore(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      },
    });
  }

  playThisSong(token) {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/search?q=better%20now&type=track',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        //console.log('data.tracks.items.0.uri:', data.tracks.items[0].uri);
        //let songUri = data.tracks.items[0].uri;
      },
    });
  }

  viewDevices(token) {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/devices',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        //console.log('devices', data);
      },
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <div>
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.progress_ms}
              />
              <button onClick={() => this.playThisSong(this.state.token)}>
                Click ME!!!!!
              </button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTokenToFirestore: song => {
    dispatch(addTokenToFirestore(song));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(Spotify);
