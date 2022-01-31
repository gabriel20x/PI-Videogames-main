import { Fragment } from "react"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"
import { getVideogameDetail,cleanDetail } from "../../Redux/actions"
import styles from './detail.module.css'

export default function Detail(){
  let {id} = useParams()
  let videogame = useSelector(state => state.videogameDetail)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogameDetail(id))
    return dispatch(cleanDetail())
  },[])
  return <>
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.image}>
        <p>{videogame.name}</p>
        <img src={videogame.background_image} alt={videogame.name}/>
      </div>
      
      <div className={styles.description} dangerouslySetInnerHTML={{__html: videogame.description}}></div>
      

      <div className={styles.properties}>

        <div className={styles.genres}>
          {videogame.genres?.map((genre)=>{
            return <span>{genre.name}</span>
          })}
        </div>

        <div className={styles.platforms}>
          {videogame.platforms?.map((platform)=>{
            if(platform.platform){
              return <span>{platform.platform.name}</span>
            } else {
              return <span>{platform}</span>
            }
          })}
        </div>

        <div className={styles.rating}>
          {videogame.rating}
        </div>

      </div>

    </div>

  </div>
  </>
}