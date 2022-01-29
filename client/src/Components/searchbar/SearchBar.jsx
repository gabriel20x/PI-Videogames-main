import React from 'react';
import styles from './SearchBar.module.css'
import lupa from '../../Images/lupa.png'

export default function SearchBar({handleInputChange,searchVideogame}) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" onChange={(e) => handleInputChange(e)} name='name' placeholder="Filter"/>
      <button className={styles.add} onClick={searchVideogame}><img src={lupa} alt="lupa" /></button>
    </div>
  )
};