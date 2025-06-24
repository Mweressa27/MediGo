import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
    <Link to="/" className="font-bold text-lg">MediGo</Link>
    <div className="space-x-4">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default Navbar;
