import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './redux/configureStore';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Routines from './containers/Routines';
import Routine from './containers/Routine';
import MuscleGroup from './containers/MuscleGroup';
import NoMatch from './components/NoMatch';

const store = createStore();

const App: React.FC = () => {
  return (
    <Router>
    <Provider store={store}>
      <Header/>
      <Switch>
          <Route exact path="/">
            <Redirect to="/routines" />
          </Route>
          <Route path="/routine/:routineId/muscleGroup/:muscleGroupId">
            <MuscleGroup />
          </Route>
          <Route exact path="/routine/:routineId">
            <Routine />
          </Route>
          <Route exact path="/routines">
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
