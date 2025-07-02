import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MediGo
        </Link>

        <div className="space-x-4">
          {user ? (
            <>
              {user.user_type === 'admin' && (
                <Link to="/admin" className="hover:underline">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
