import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Routine from './components/Routine';
import Modify from './components/Modify';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer, rootSaga } from './modules/root';
import LoginContainer from './containers/Login';

import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import SignupContainer from './containers/Signup';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/modify" component={Modify} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/" exact component={Routine} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
