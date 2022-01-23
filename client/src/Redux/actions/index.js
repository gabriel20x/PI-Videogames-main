import * as actions from "./actionType";

export function getVideogames(){
    //Peticion a la API
    return async function(dispatch) {
      try {
        const response = await fetch(`http://localhost:3001/videogames`);
        const videogames = await response.json();
        dispatch({ type: actions.GET_VIDEOGAMES, payload: videogames });
      } catch (error) {
        console.log(error);
      }
        }
}

export function getVideogameDetail(id){
  //Peticion a la API
  return async function(dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/videogames/${id}`);
      const videogame = await response.json();
      dispatch({ type: actions.GET_DETAIL, payload: videogame });
    } catch (error) {
      console.log(error);
    }
      }
}