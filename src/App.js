import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotesPage from './components/NotesPage';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/notes" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/notes" /> : <RegisterPage />}
        />
        <Route
          path="/notes"
          element={user ? <NotesPage /> : <Navigate to="/login" />}
        />
        {/* Fallback route if none of the above match */}
        <Route path="*" element={<Navigate to="/notes" />} />
      </Routes>
    </Router>
  );
};

export default App;
