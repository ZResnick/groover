import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignedOutLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signin">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </ul>
  );
}
