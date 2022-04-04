import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route component={ Login } path="/" />
        <Route component={ Wallet } path="/carteira" />
      </Switch>
    );
  }
}

export default App;
