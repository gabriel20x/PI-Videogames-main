import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getVideogames } from "../../Redux/actions"
import Videogame from "../videogame/Videogame"

export default function Videogames(){
  let videogames = useSelector((state) => state.videogames)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogames())
  },[])
  return <>
  {videogames.map((videogame)=>{
    return <Videogame videogame = {videogame}  />
  })}
  </>
}