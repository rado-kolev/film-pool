import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai'

const SavedFilms = () => {
  const [films, setFilms] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(
      doc(db, 'users', `${user?.email}`), (doc) => {
        setFilms(doc.data()?.savedFilms);
      })
  }, [user?.email]);

  const filmRef = doc(db, 'users', `${user?.email}`);
  const deleteFilm = async (passedID) => {
    try {
      const result = films.filter((item) => item.id !== passedID);
      await updateDoc(filmRef, {
        savedFilms: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 className='p-4 font-bold text-white md:text-xl'>My Films</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='absolute left-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {films.map((item) => (
            <div key={item.id} className='w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] inline-block cursor-pointer relative p-2'>
              <img
                className='block w-full h-auto'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100'>
                <p className='flex items-center justify-center h-full px-8 text-xs font-bold text-center whitespace-normal md:text-sm'>
                  {item?.title}
                </p>
                <p onClick={() => deleteFilm(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
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

export default SavedFilms;
