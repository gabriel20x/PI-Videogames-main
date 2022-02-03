import styles from './pagination.module.css'

export default function Videogame({videogamesForPage,totalVideogames,paginate}){
  let pages = []
  for( let i = 1; i <= Math.ceil(totalVideogames/videogamesForPage) ; i++){
    pages.push(i)
  }
  return <>
  {pages.map((page)=>{
    return <div className={`button_container ${styles.button}`} key={page}>
        <button className={`button_list`} onClick={()=> paginate(page)}>
          <div className={'button_list_item'}>{page}</div>
        </button>
      </div>
  })}
  </>
}