import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import SelectionTracker from './components/SelectionTracker';
import UpdateDetails from './components/UpdateDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/selection-tracker" element={<SelectionTracker />}/>
        <Route path="/updateDetails" element={<UpdateDetails/>}/>
      </Routes>
    </Router>
  );
};

export default App;
