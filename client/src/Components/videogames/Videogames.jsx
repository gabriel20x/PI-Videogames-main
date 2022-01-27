import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getVideogames } from "../../Redux/actions"
import Videogame from "../videogame/Videogame"
import Sidebar from "../sidebar/sidebar"

export default function Videogames(){
  let videogames = useSelector((state) => state.videogames)
  let filters = useSelector(state => state.filters)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogames())
  },[])
  let listOfGames = (videogames) => {
    let filtered = videogames.filter((videogame)=>{
      if(filters.onlyLocal) {
        if(isNaN(videogame.id)) return true
      } else if(filters.genres.length > 0) {
        return filters.genres.every(
                genre => videogame.genres.find(
                element => element.name == genre
              ))
      } else return true
    })
    let ordered = filtered
    if(filters.order.method !== 'none') {
      switch (filters.order.type) {
        case 'alphabetic':
          if(filters.order.method === 'asc') {
            ordered = filtered.sort((a,b) => {
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1; 
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
          })} else {
            ordered = filtered.sort((a,b) => {
              if(a.name.toLowerCase() < b.name.toLowerCase()) return 1; 
              if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
          })}
          break;
        case 'rating':
          if(filters.order.method === 'asc') {
            ordered = filtered.sort((a,b) => a.rating - b.rating )} 
            else {
            ordered = filtered.sort((a,b) => b.rating - a.rating )}
          break;
        default:
          break;
      }
    }
    return ordered
  }
  return <>
  <Sidebar/>
  {listOfGames(videogames).map((videogame)=>{
    return <Videogame videogame = {videogame} key={videogame.id} />
  })}
  </>
}