import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    // Fetch the user's saved films from Firebase and check if the current movie is in the list
    const checkLikedStatus = async () => {
      if (user?.email) {
        const userDocRef = doc(db, 'users', user?.email);
        const userDoc = await getDoc(userDocRef);
        const savedFilms = userDoc.data()?.savedFilms || [];
        const isLiked = Array.isArray(savedFilms)
          ? savedFilms.some((film) => film.id === item.id)
          : false;

        setLike(isLiked);
      }
    };

    checkLikedStatus();
  }, [user?.email, item.id]);

  const filmID = doc(db, 'users', `${user?.email}`);

  const saveFilm = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);

      const filmToSave = {
        id: item.id,
        title: item.title,
        img: item.backdrop_path,
      };

      // Add or remove the film from the user's savedFilms list in Firebase based on the like status
      if (like) {
        await updateDoc(filmID, {
          savedFilms: arrayRemove(filmToSave),
        });
      } else {
        await updateDoc(filmID, {
          savedFilms: arrayUnion(filmToSave),
        });
      }
    } else {
      alert('Please log in to save a film!');
    }
  };

  return (
    <div className='w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px] inline-block cursor-pointer relative p-2'>
      <img
        className='block w-full h-auto'
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100'>
        <p className='flex items-center justify-center h-full px-8 text-sm font-bold text-center whitespace-normal md:text-xl'>
          {item?.title}
        </p>
        <p onClick={saveFilm}>
          {like ? (
            <FaHeart className='absolute text-gray-300 top-4 left-4' />
          ) : (
            <FaRegHeart className='absolute text-gray-300 top-4 left-4' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;



// The original code was adapted from

// import React, { useState } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { UserAuth } from '../context/AuthContext';
// import { db } from '../firebase';
// import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

// const Movie = ({ item }) => {
//   const [like, setLike] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const { user } = UserAuth();

//   const filmID = doc(db, 'users', `${user?.email}`);

//   const saveFilm = async () => {
//     if (user?.email) {
//       setLike(!like);
//       setSaved(true);
//       await updateDoc(filmID, {
//         savedFilms: arrayUnion({
//           id: item.id,
//           title: item.title,
//           img: item.backdrop_path,
//         }),
//       });
//     } else {
//       alert('Please log in to save a film!');
//     }
//   };

//   return (
//     <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
//       <img
//         className='block w-full h-auto'
//         src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
//         alt={item?.title}
//       />
//       <div className='absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100'>
//         <p className='flex items-center justify-center h-full px-8 text-xs font-bold text-center whitespace-normal md:text-sm'>
//           {item?.title}
//         </p>
//         <p onClick={saveFilm}>
//           {like ? (
//             <FaHeart className='absolute text-gray-300 top-4 left-4' />
//           ) : (
//             <FaRegHeart className='absolute text-gray-300 top-4 left-4' />
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Movie;
