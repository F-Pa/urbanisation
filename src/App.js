import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useToken from './authentification/useToken';

import Login from './Login';
import Utilisateur from './utilisateur/Utilisateur';
import Annonceur from './annonceur/Annonceur';

import './style/App.css';

function App(props) {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Utilisateur" component={Utilisateur}/>
        <Route path="/Annonceur" component={Annonceur}/>
      </Switch>
    </div>
  </Router>
  );
}

const Home = () => (
  <div className="App">
  <header className="App-header">
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
);

export default App;
