import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timeout if the component unmounts
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <>
      <div className='w-full h-screen'>
        <img
          className=' absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/a91152fa-5a80-4073-a559-b6da417ba113/LU-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
        <div className='fixed w-full sm:px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Sign In</h1>
              {error ? (
                <p className='p-3 mt-4 bg-red-400/80'>
                  Wrong credentials, please try again!
                </p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className='w-full flex flex-col py-4'
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
                <button className='bg-red-600/80 py-3 my-6 rounded-lg border border-red-600/90 hover:border-white hover:bg-white/75 hover:text-red-600 font-bold'>
                  Sign In
                </button>
                <div className='flex justify-between items-center text-sm text-gray-400'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='my-8'>
                  <span className='text-gray-400'>
                    Don&apos;t have an account?
                  </span>{' '}
                  <Link
                    to='/signup'
                    className='font-bold hover:text-red-600 hover:underline'
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login