import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='pt-20'>
        {children}
      </div>
    </>
  );
};

export default Layout;
