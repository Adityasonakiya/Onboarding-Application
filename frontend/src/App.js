import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import SelectionTracker from './components/SelectionTracker';
import UpdateDetails from './components/UpdateDetails';
import LandingPage from './components/LandingPage'; // Import LandingPage component
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Wrap routes requiring Navbar with Layout */}
        <Route path="/selection-tracker" element={<Layout><SelectionTracker /></Layout>} />
        <Route path="/update-details" element={<Layout><UpdateDetails /></Layout>} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import SelectionTracker from './components/SelectionTracker';
// import UpdateDetails from './components/UpdateDetails';
// import Layout from './components/Layout';

// const App = () => {
//   return (
//     <Router>
//       {/* <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate replace to="/navbar" />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/selection-tracker" element={<SelectionTracker/>}/>
//           <Route path="/update-details" element={<UpdateDetails/>}/>
//         </Routes>
//       </Layout> */}
//       <Routes>
//         <Route path="/" element={<Login />} /> {/* Home page with HomeNavbar */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
        
//         {/* Wrap routes requiring Navbar with Layout */}
//         <Route path="/selection-tracker" element={<Layout><SelectionTracker /></Layout>} />
//         <Route path="/update-details" element={<Layout><UpdateDetails /></Layout>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
