import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';

import { AuthRoute, AsyncComponent } from '@lenic/react-auth-route';

import Main from './main/index.jsx';
import Login from './login';

AsyncComponent.Loading = () => <div>Default Loading.</div>;

AuthRoute.Valid = props => {
  if (props.match.path === '/login') {
    return true;
  }

  if (props.match.path === '/users') {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location
          },
        }}
      />
    );
  }

  if (props.match.path === '/roles') {
    return (
      <span>Not Authed</span>
    );
  }

  return true;
}

const root = (
  <Router>
    <Switch>
      <AuthRoute key="login" exact path="/login" component={Login} />
      <AuthRoute key="main" path="/" component={Main} />
    </Switch>
  </Router>
);

ReactDOM.render(root, document.getElementById('container'));
