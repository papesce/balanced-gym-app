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
import MuscleGroups from './containers/Routine';
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
            <div> next step</div> 
          </Route>
          <Route exact path="/routine/:routineId">
            <MuscleGroups />
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
