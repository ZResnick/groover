import React, { Component } from 'react';
import { addASong } from '../../store/reducers/songReducer';
import { connect } from 'react-redux';
import Spotify from './Spotify';

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      artist: '',
      album: '',
      length: '',
      upvotes: 0,
    };

    this.handleChange = this.handelChange.bind(this);
    this.handleSubmit = this.handelSubmit.bind(this);
  }

  handelChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handelSubmit = evt => {
    evt.preventDefault();
    this.props.addASong(this.state);
    this.setState({
      title: '',
      artist: '',
      album: '',
      length: '',
      upvotes: 0,
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Add a Song:</h5>
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
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                id="artist"
                value={this.state.artist}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="album">Album</label>
              <input
                type="text"
                id="album"
                value={this.state.album}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="length">Runtime</label>
              <input
                type="number"
                min="0"
                step=".01"
                id="length"
                value={this.state.length}
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

export default connect(
  null,
  mapDispatchToProps
)(AdminPage);
