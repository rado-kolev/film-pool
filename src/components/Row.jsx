import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className='p-4 font-bold text-white md:text-xl'>{title}</h2>
      <div className='relative flex items-center group mb-6 px-2'>
        <MdChevronLeft
          onClick={slideLeft}
          className='absolute left-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
          size={40}
        />
        <div
          id={'slider' + rowID}
          className='relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='absolute right-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
