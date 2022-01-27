import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getVideogames } from "../../Redux/actions"
import Videogame from "../videogame/Videogame"
import Sidebar from "../sidebar/sidebar"

export default function Videogames(){
  let videogames = useSelector((state) => state.videogames)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogames())
  },[])
  return <>
  <Sidebar/>
  {videogames.map((videogame)=>{
    return <Videogame videogame = {videogame} key={videogame.id} />
  })}
  </>
}