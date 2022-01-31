import React from "react"
import { useNavigate } from "react-router"
import styles from './videogame.module.css'

export default function Videogame({videogame}){
  const navigate = useNavigate()
  let id
  id = videogame.id ? videogame.id : videogame.Id
  let handleDetail = () =>{
    navigate(id.toString())
  }
  const backgroundImage = { backgroundImage: `url(${videogame.background_image})`}
  return <>
  <div className={styles.container}>
  <div className={styles.videogameImg} style={backgroundImage}  onClick={handleDetail}>
    <div className={styles.shadow}>
        <div className={styles.genreBanner}>
          {videogame.genres.map((genre,index)=>{
            return <React.Fragment key={index}>{`${genre.name} `}</React.Fragment>
          })}
        </div>
        <div className={styles.ratingBanner}>{videogame.rating}</div>
    </div>
  </div>  
  <div>{videogame.name}</div>
</div>
  </>
}