import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Login from './components/login';
import createArticle from './components/createArticle';
import Article from './components/article';
import Register from './components/register';
import OTP from './components/otp';

import { BrowserRouter, Switch, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Article} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/article/create" component={createArticle} />
      <Route path="/otp/verification" component={OTP} />
    </Switch>
  </BrowserRouter>,
  rootElement
);


serviceWorker.unregister();
