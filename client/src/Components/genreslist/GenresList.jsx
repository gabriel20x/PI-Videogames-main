import React from 'react';
import Checkbox from '../checkbox/checkbox';
import styles from './GenresList.module.css'

export default function genresList({handleCheckbox,genres}) {
  return(
    <>
    {genres.map((genre) => {
            return <Checkbox key={genre.id} name={genre.name} action={handleCheckbox} target={'genres'} />
            // (
            //   <li key={genre.id}>
            //     <input
            //       type="checkbox"
            //       name={genre.name}
            //       id={genre.id}
            //       onChange={(e) => handleCheckbox(e.target,'genres')}
            //     />
            //     <label id={genre.id}>{genre.name}</label>
            //   </li>
            // );
          })}
    </>
  )
};