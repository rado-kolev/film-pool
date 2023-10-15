import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import axios from 'axios';

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  // console.log(movie);

  const truncateString = (str, num) => {
      return str?.length > num ? str.slice(0, num) + '...' : str;
  };

  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-gray-900' />
        <img
          className='object-cover w-full h-full'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl font-bold md:text-5xl'>{movie?.title}</h1>
          <div className='my-4'>
            <button className='px-5 py-2 text-black bg-gray-300 border border-gray-300'>
              Play
            </button>
            <button className='px-5 py-2 ml-4 text-white border border-gray-300'>
              Watch Later
            </button>
          </div>
          <p className='text-sm text-gray-400'>
            Released: {movie?.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
