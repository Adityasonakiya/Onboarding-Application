import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import SelectionTracker from './components/SelectionTracker';
import UpdateDetails from './components/UpdateDetails';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/navbar" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selection-tracker" element={<SelectionTracker/>}/>
          <Route path="/updateDetails" element={<UpdateDetails/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
