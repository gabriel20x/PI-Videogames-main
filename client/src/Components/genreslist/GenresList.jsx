import React from 'react';
import styles from './GenresList.module.css'
import lupa from '../../Images/lupa.png'

export default function genresList({handleCheckbox,genres}) {
  return(
    <>
    {genres.map((genre) => {
            return (
              <li key={genre.id}>
                <input
                  type="checkbox"
                  name={genre.name}
                  id={genre.id}
                  onChange={(e) => handleCheckbox(e.target,'genres')}
                />
                <label id={genre.id}>{genre.name}</label>
              </li>
            );
          })}
    </>
  )
};