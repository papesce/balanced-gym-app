import React from "react";
import { Provider } from "react-redux";
import { createStore } from "./redux/configureStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Routines from "./containers/Routines";
import Routine from "./containers/Routine";
import MuscleGroup from "./containers/MuscleGroup";
import NoMatch from "./components/NoMatch";
import Target from "./containers/Target";
import Exercise from "./containers/Exercise";

const store = createStore();

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/routines" />
          </Route>
          <Route exact path="/exercise/:exerciseId">
            <Exercise />
          </Route>
          <Route
            exact
            path="/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId"
          >
            <Target />
          </Route>
          <Route exact path="/routine/:routineId/muscleGroup/:muscleGroupId">
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
};

export default App;
