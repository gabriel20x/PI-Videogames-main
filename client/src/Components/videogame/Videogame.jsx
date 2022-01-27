import { useNavigate } from "react-router"


export default function Videogame({videogame}){
  const navigate = useNavigate()
  let id
  let handleDetail = () =>{
    navigate(videogame.id.toString())
  }
  id = videogame.id ? videogame.id : videogame.Id
  return <>
    <p onClick={handleDetail}>{id} {videogame.name} {videogame.rating}</p>
  </>
}