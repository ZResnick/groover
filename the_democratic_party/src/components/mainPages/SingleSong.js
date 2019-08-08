import React from 'react';

export default function SingleSong(props) {
  return (
    <li className="singleSong">
      Title: {props.title}, Artist: {props.artist}, Album: {props.album},
      Length: {props.length}
    </li>
  );
}
