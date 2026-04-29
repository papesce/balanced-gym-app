import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Routines from "./containers/Routines";
import Routine from "./containers/Routine";
import MuscleGroup from "./containers/MuscleGroup";
import NoMatch from "./components/NoMatch";
import Target from "./containers/Target";
import Exercise from "./containers/Exercise";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/routines" replace />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routine/:routineId" element={<Routine />} />
          <Route path="/routine/:routineId/muscleGroup/:muscleGroupId" element={<MuscleGroup />} />
          <Route path="/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId" element={<Target />} />
          <Route path="/exercise/:exerciseId" element={<Exercise />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
