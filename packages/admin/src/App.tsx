import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './redux/configureStore';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import ExerciseBrowser from './pages/ExerciseBrowser';
import ExerciseForm from './pages/ExerciseForm';
import MuscleList from './pages/MuscleList';
import MuscleForm from './pages/MuscleForm';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><ExerciseBrowser /></ProtectedRoute>} />
              <Route path="/exercise/new" element={<ProtectedRoute><ExerciseForm /></ProtectedRoute>} />
              <Route path="/exercise/:exerciseId/edit" element={<ProtectedRoute><ExerciseForm /></ProtectedRoute>} />
              <Route path="/muscles" element={<ProtectedRoute><MuscleList /></ProtectedRoute>} />
              <Route path="/muscle/new" element={<ProtectedRoute><MuscleForm /></ProtectedRoute>} />
              <Route path="/muscle/:muscleId/edit" element={<ProtectedRoute><MuscleForm /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
