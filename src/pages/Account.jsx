import React from 'react'
import SavedFilms from '../components/SavedFilms';

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
        <img
          className='object-cover w-full h-[400px]'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/a91152fa-5a80-4073-a559-b6da417ba113/LU-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='/'
        />
        <div className='fixed top-0 left-0 w-full bg-black/50 h-[550px]'>
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl font-bold md:text-5xl'>My Films</h1>
          </div>
        </div>
      </div>
      <SavedFilms />
    </>
  );
}

export default Account