import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function SingleSong(props) {
  let minutes = Math.floor(props.length);
  let seconds = Math.floor((props.length * 60) % 60);

  return (
    <tr className="singleSong">
      <th>{props.title}</th>
      <th>{props.artist}</th>
      <th>{props.album}</th>
      <th>
        {minutes}:{seconds}
      </th>
      <th>
        <button onClick={() => this.upvote(props.id)}>{`<`}</button>
        {props.upvotes}
        <button onClick={() => this.upvote(props.id)}>{`>`}</button>
      </th>
    </tr>
  );
}
