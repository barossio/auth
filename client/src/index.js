import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const history = createHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <Router history={history}>
  <App>
    <Switch>
      <Route path='/signin' component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/' component={Home} />
    </Switch>
  </App>
  </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
