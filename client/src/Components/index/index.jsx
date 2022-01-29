import {Link} from 'react-router-dom'
import styles from './Index.module.css'

export default function Index(){
  return <>
  <div className={styles.container}>
    <div className={styles.button}>
      <Link to={'/videogames'}><p>Press Start</p></Link>
    </div>
  </div>
  </>
}