import styles from './checkbox.module.css'

export default function checkbox({id,name,action,target}){
  return <>
  <li key={id} className={styles.list}>
    <input className={styles.checkbox} type="checkbox" name={name} id={id} onChange={(e) => action(e.target,target)}/>
    <label id={id}>{name}</label>
  </li>
  </>
}