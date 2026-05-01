import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './redux/configureStore';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
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
          <BrowserRouter basename="/admin">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><AdminLayout><ExerciseBrowser /></AdminLayout></ProtectedRoute>} />
              <Route path="/exercise/new" element={<ProtectedRoute><AdminLayout><ExerciseForm /></AdminLayout></ProtectedRoute>} />
              <Route path="/exercise/:exerciseId/edit" element={<ProtectedRoute><AdminLayout><ExerciseForm /></AdminLayout></ProtectedRoute>} />
              <Route path="/muscles" element={<ProtectedRoute><AdminLayout><MuscleList /></AdminLayout></ProtectedRoute>} />
              <Route path="/muscle/new" element={<ProtectedRoute><AdminLayout><MuscleForm /></AdminLayout></ProtectedRoute>} />
              <Route path="/muscle/:muscleId/edit" element={<ProtectedRoute><AdminLayout><MuscleForm /></AdminLayout></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
