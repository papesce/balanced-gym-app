import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './redux/configureStore';
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

const store = createStore();

const App: React.FC = () => {
  return (
    <Router>
    <Provider store={store}>
      <Header/>
      <Switch>
          <Route exact path="/">
            <Redirect to="/routine" />
          </Route>
          <Route path="/routine/:id">
            <div>now we are talking about</div>
          </Route>
          <Route exact path="/routine">
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
