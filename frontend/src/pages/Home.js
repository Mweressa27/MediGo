import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
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
  )
}

export default Home


