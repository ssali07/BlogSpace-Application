import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
     return (
          <div className="min-h-screen flex flex-col bg-white">
               <Navbar />
               <div className="flex-1 container mx-auto px-4 py-8">
                    <Outlet />
               </div>
               <Footer />
          </div>
     );
};

export default Layout;
