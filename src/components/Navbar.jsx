import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 w-full z-[100] absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-2xl sm:text-4xl font-bold cursor-pointer'>
          FilmPool
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='bg-white/75 px-3 py-1 sm:px-6 sm:py-2 rounded-lg text-red-600 mr-2 sm:mr-4'>
              Account
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600/90 px-3 py-1 sm:px-6 sm:py-2  rounded-lg cursor-pointer text-white'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='bg-white/75 px-2 py-1 sm:px-6 sm:py-2  rounded-lg text-red-600 mr-2 sm:mr-4'>
              Sign In
            </button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600/90 px-2 py-1 sm:px-6 sm:py-2  rounded-lg cursor-pointer text-white'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
