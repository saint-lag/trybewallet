import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact component={ Login } path="/" />
        <Route exact component={ Wallet } path="/carteira" />
      </Switch>
    );
  }
}

export default App;
