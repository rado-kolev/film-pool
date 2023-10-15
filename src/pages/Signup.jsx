import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full h-screen'>
        <img
          className='absolute object-cover w-full h-full'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/a91152fa-5a80-4073-a559-b6da417ba113/LU-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='/'
        />
        <div className='fixed top-0 left-0 w-full h-screen bg-black/60' />
        <div className='fixed z-50 w-full sm:px-4 py-24'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col w-full py-4'
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className='p-3 my-2 bg-gray-700 rounded-lg'
                  type='email'
                  placeholder='Email'
                  autoComplete='email'
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className='p-3 my-2 bg-gray-700 rounded-lg'
                  type='password'
                  placeholder='Password'
                  autoComplete='current-password'
                />
                <button className='py-3 my-6 font-bold rounded-lg bg-red-600/80'>
                  Sign Up
                </button>
                <div className='flex items-center justify-between text-sm text-gray-400'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='py-8'>
                  <span className='text-gray-400'>
                    Already subscribed to FilmPool?
                  </span>{' '}
                  <Link to='/login'>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
