import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux'
import { render } from 'react-dom'
import Login  from './components/auth/login'
import Signup from './components/auth/signup'
import {createStore, combineReducers, applyMiddleware } from "redux";
import {Provider} from "react-redux";
import Index from './components/pages/index'
import About from './components/pages/about'
import Root from './components/layouts/root'
import reducers from "./reducers"
import { logIn, logOut } from "./actions"

let rootElement = document.getElementById('root');
let socketIOClient = require('socket.io-client');
let sailsIOClient = require('sails.io.js');
let io = sailsIOClient(socketIOClient);
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);


io.sails.url = 'http://localhost:1337';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, store);
    return(<Router history={history}>
              <Route path="/" component={Root}>
                <IndexRoute component={Index}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
              </Route>
            </Router>)
  }
}

store.subscribe(() => {
  console.log("subscribe", store.getState())
});

render((
  <Provider store={store}>
    <App/>
  </Provider>
), rootElement);
