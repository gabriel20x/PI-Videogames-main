import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import styles from './navbar.module.css'

export default function Navbar(){
  return <>
    <nav className={`${styles.navbar} button_container`} data-testid='navbar'>
      <ul className='button_list'>
        <li><NavLink className='button_list_item' to={'/videogames'}>Videogames</NavLink></li>
        <li><NavLink className='button_list_item' to={'/videogames/create'}>Create</NavLink></li>
      </ul>
    </nav>
    <Outlet/>
    </>
}