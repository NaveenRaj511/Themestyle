import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import initialState from './store/reducers/initialState';
import { productsReducer } from './store/reducers/reducers';

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.7.0";

// Creating a middleware with the thunk
const middleWare = [thunk];

// Using an enhancer to access with the redux store as the dev tool
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

    // Using the enhancer in middleware
const enhancer = composeEnhancers(
  applyMiddleware(...middleWare),
  // other store enhancers if any
);

// create store from the store and pass reducer and the enhancer
const store = createStore(productsReducer,initialState, enhancer);

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
