import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getVideogames } from "../../Redux/actions"

export default function Videogame({videogame}){
  return <>
    <p>{videogame.id} {videogame.name}</p>
  </>
}