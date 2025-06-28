import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to MediGo</h1>
      <p className="text-gray-700 text-lg max-w-xl mb-8">
        MediGo helps you locate hospitals, view doctors, book appointments, and manage healthcare in one convenient place.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/hospitals"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View Hospitals
        </Link>
        <Link
          to="/login"
          className="bg-gray-100 text-blue-600 px-6 py-2 rounded border border-blue-600 hover:bg-gray-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
