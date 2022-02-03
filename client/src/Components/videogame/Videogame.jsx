import React from "react"
import { useNavigate } from "react-router"
import styles from './videogame.module.css'
import localImg from '../../Images/localimg.png'

export default function Videogame({videogame}){
  const navigate = useNavigate()
  let id = videogame.id ? videogame.id : videogame.Id
  let img = videogame.background_image ? videogame.background_image : localImg
  let handleDetail = () =>{
    navigate(id.toString())
  }
  const backgroundImage = { backgroundImage: `url(${img})`}
  const containerStyle = styles.container + 
                        `${(videogame.name.length > 22) ? ' ' + styles.longName : ''}` +
                        `${(videogame.name.length > 35) ? ' ' + styles.largeName : ''}`
  return <>
  <div className={containerStyle}>
  <div className={styles.videogameImg} style={backgroundImage}  onClick={handleDetail}>
    <div className={styles.shadow}>
      {videogame.genres.length > 0 ? (
      <div className={styles.genreBanner}>
          {videogame.genres.map((genre,index)=>{
            return <React.Fragment key={index}>{`${genre.name} `}</React.Fragment>
          })}
      </div>) : null
    }
        <div className={styles.ratingBanner}>{videogame.rating}</div>
    </div>
  </div>  
  <div className={styles.gameName} >{videogame.name}</div>
</div>
  </>
}