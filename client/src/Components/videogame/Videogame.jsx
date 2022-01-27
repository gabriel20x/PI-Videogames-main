import { useNavigate } from "react-router"


export default function Videogame({videogame}){
  const navigate = useNavigate()
  let handleDetail = () =>{
    navigate(videogame.id.toString())
  }

  return <>
    <p onClick={handleDetail}>{videogame.id} {videogame.name}</p>
  </>
}