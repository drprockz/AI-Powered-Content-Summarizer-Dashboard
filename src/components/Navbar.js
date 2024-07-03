import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">Home</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.username}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
