import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, removeSong } from '../../store/reducers/songReducer';

class SingleSong extends Component {
  downvote(id, votes) {
    this.props.downvote(id, votes);
  }

  upvote(id, votes) {
    this.props.upvote(id, votes);
  }

  remove(id) {
    this.props.removeSong(id);
  }

  render() {
    let timeInSeconds = this.props.length / 1000;
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor((timeInSeconds / 60 - minutes) * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return (
      <tr className="singleSong">
        <th>
          <button onClick={() => this.remove(this.props.id)}>Delete</button>
        </th>
        <th>{this.props.title}</th>
        <th>{this.props.artist}</th>
        <th>{this.props.album}</th>
        <th>
          {minutes}:{seconds}
        </th>
        <th>
          <button
            onClick={() => this.upvote(this.props.id, this.props.upvotes)}
          >{`⇧`}</button>
          {this.props.upvotes}
          <button
            disabled={!this.props.upvotes}
            onClick={() => this.downvote(this.props.id, this.props.upvotes)}
          >{`⇩`}</button>
        </th>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  upvote: (id, votes) => dispatch(upvote(id, votes)),
  downvote: (id, votes) => dispatch(downvote(id, votes)),
  removeSong: id => dispatch(removeSong(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(SingleSong);
