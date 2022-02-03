import { Fragment } from "react"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"
import { getVideogameDetail,cleanDetail } from "../../Redux/actions"
import styles from './detail.module.css'
import localImg from '../../Images/localimg.png'
import Loading from "../loading/loading"

export default function Detail(){
  let {id} = useParams()
  let videogame = useSelector(state => state.videogameDetail)
  let dispatch = useDispatch()
  let img = videogame.background_image ? videogame.background_image : localImg
  useEffect(()=>{
    dispatch(getVideogameDetail(id))
    return dispatch(cleanDetail())
  },[])
  return <>
  {!videogame.name ? <Loading/> : (
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.image}>
        <p>{videogame.name}</p>
        <img src={img} alt={videogame.name}/>
      </div>
      
      <div className={styles.description} dangerouslySetInnerHTML={{__html: videogame.description}}></div>
      
      <div className={styles.properties}>

        <div className={styles.genres}>
          <h4>Genres<br/></h4>
          {videogame.genres?.map((genre)=>{
            return <li>{genre.name}</li>
          })}
        </div>

        <div className={styles.platforms}>
          <h4>Platforms<br/></h4>
          {videogame.platforms?.map((platform)=>{
            if(platform.platform){
              return <li>{platform.platform.name + ' '}</li>
            } else {
              return <li>{platform}</li>
            }
          })}
        </div>

        <div className={styles.released}>
          <h4>Released<br/></h4>
          {videogame.released}
        </div>

        <div className={styles.rating}>
          <h4>Rating<br/></h4>
          {videogame.rating}
        </div>

      </div>

    </div>

  </div>

  )}
  </>
}