import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Login />
      </div>

      {/* Right: Hero Image with overlay */}
      <div className="hidden md:block w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            filter: 'brightness(0.8)',
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex items-center justify-center px-6">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Your Health, Our Mission</h2>
            <p className="text-lg max-w-md">
              Find hospitals, book appointments, and manage your care with MediGo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



