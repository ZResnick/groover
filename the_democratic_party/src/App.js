import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import AllSongs from './components/mainPages/AllSongs';
import history from './history';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AdminPage from './components/mainPages/AdminPage';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={AllSongs} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/adminPage" component={AdminPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
