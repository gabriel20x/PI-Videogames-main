import {Link} from 'react-router-dom'
import styles from './Index.module.css'

export default function Index(){
  return <>
  <div className={styles.container}>
    <div>
      <div className={`button_container ${styles.button_container}`}>
        <button className={`button_list ${styles.button}`}>
          <Link className={'button_list_item'} to={'/videogames'}>Press Start</Link>
        </button>
      </div>
    </div>
  </div>
  </>
}