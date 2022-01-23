import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router"
import { getVideogameDetail } from "../../Redux/actions"

export default function Detail(){
  let {id} = useParams()
  let videogame = useSelector(state => state.videogameDetail)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogameDetail(id))
  },[])
  return <>
    <p>{videogame.id} {videogame.name}</p>
  </>
}