import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './views/Login';
import Home from './views/Home';
import ResetPassword from './views/Login/reset';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/reset_password" component={ResetPassword} />
      </Switch>    
    </BrowserRouter>
  );
}