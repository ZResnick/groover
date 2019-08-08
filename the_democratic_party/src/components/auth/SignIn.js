import React, { Component } from 'react';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
