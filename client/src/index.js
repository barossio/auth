import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Home from './components/Home';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Feature from './components/Feature';
import RequireAuth from './components/auth/require_auth';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const history = createHistory();
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if(token){
  store.dispatch({type : AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
  <App>
    <Switch>
      <Route path='/signin' component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/feature' component={RequireAuth(Feature)} />
      <Route path='/signout' component={Signout} />
      <Route path='/' component={Home} />
    </Switch>
  </App>
  </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
