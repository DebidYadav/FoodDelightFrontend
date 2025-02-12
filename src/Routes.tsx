import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default Routes;
