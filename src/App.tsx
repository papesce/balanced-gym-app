import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Header from './components/Header';
// import { ElemList } from './components/ElemList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Routines from './containers/Routines';
import NoMatch from './components/NoMatch';

const App: React.FC = () => {
  return (
    <Router>
    <Provider store={store}>
      <Header/>
      <Switch>
          <Route exact path="/">
            <Redirect to="/routine" />
          </Route>
          <Route path="/routine">
            <Routines />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
      </Switch>
    </Provider>
    </Router>
  );
}

export default App;
