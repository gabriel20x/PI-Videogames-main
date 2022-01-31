import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import styles from './navbar.module.css'

export default function Navbar(){
  return <>
    <nav className={styles.navbar} data-testid='navbar'>
      <ul className={styles.list}>
        <li className={styles.item}><NavLink className={styles.navLink} to={'/videogames'}>Videogames</NavLink></li>
        <li className={styles.item}><NavLink className={styles.navLink} to={'/videogames/create'}>Create</NavLink></li>
      </ul>
    </nav>
    <Outlet/>
    </>
}