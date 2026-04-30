import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Routines from "./containers/Routines";
import Routine from "./containers/Routine";
import MuscleGroup from "./containers/MuscleGroup";
import NoMatch from "./components/NoMatch";
import Target from "./containers/Target";
import Exercise from "./containers/Exercise";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><Navigate to="/routines" replace /></ProtectedRoute>} />
            <Route path="/routines" element={<ProtectedRoute><Routines /></ProtectedRoute>} />
            <Route path="/routine/:routineId" element={<ProtectedRoute><Routine /></ProtectedRoute>} />
            <Route path="/routine/:routineId/muscleGroup/:muscleGroupId" element={<ProtectedRoute><MuscleGroup /></ProtectedRoute>} />
            <Route path="/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId" element={<ProtectedRoute><Target /></ProtectedRoute>} />
            <Route path="/exercise/:exerciseId" element={<ProtectedRoute><Exercise /></ProtectedRoute>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
