export default function Videogame({videogamesForPage,totalVideogames,paginate}){
  let pages = []
  for( let i = 1; i <= Math.ceil(totalVideogames/videogamesForPage) ; i++){
    pages.push(i)
  }
  return <>
  {pages.map((page)=>{
    return <button onClick={()=> paginate(page)} key={page}>{page}</button>
  })}
  </>
}