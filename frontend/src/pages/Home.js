import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center text-white px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-md text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to MediGo</h1>
          <p className="text-lg mb-6">
            MediGo helps you locate hospitals, view doctors, book appointments, and manage healthcare in one convenient place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/hospitals"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              View Hospitals
            </Link>
            <Link
              to="/login"
              className="bg-gray-100 text-blue-700 px-6 py-2 rounded border border-blue-600 hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

   
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-10">How MediGo Works</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">1. Search Hospitals</h3>
            <p className="text-gray-600">Find hospitals and clinics near your location instantly.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">2. Browse Doctors</h3>
            <p className="text-gray-600">See doctors by specialty, department, and accepted insurance.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">3. Book Appointments</h3>
            <p className="text-gray-600">Pick your preferred time slot and confirm online.</p>
          </div>
        </div>
      </section>

     
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-10">What You Can Do</h2>
        <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto text-left">
          <div>
            <h4 className="text-xl font-semibold mb-1">🏥 Locate Hospitals</h4>
            <p className="text-gray-700">Browse hospitals, see departments, location, and contact info.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-1">🩺 Explore Doctors</h4>
            <p className="text-gray-700">View specializations, insurance accepted, and patient reviews.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-1">📅 Book Instantly</h4>
            <p className="text-gray-700">Choose a doctor and time, and book your appointment quickly.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-1">⭐ Leave Reviews</h4>
            <p className="text-gray-700">Share feedback to help others choose better care.</p>
          </div>
        </div>
      </section>

     
      <section className="bg-blue-600 text-white py-14 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Start your healthcare journey today</h2>
        <p className="mb-6">Join MediGo and book your first appointment in seconds.</p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
