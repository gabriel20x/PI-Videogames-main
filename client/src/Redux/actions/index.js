import * as actions from "./actionType";

export function getVideogames(){
    //Peticion a la API
    return async function(dispatch) {
      try {
        const response = await (await fetch(`http://localhost:3001/videogames?page=1`)).json();
        // const response2 = await (await fetch(`http://localhost:3001/videogames?page=2`)).json();
        // const response3 = await (await fetch(`http://localhost:3001/videogames?page=3`)).json();
        // const videogames = [...response,...response2,...response3]
        const videogames = response
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

export function searchVideogames(name){
  //Peticion a la API
  return async function(dispatch) {
    try {
      const videogames = await (await fetch(`http://localhost:3001/videogames?name=${name}`)).json();
      dispatch({ type: actions.SEARCH_VIDEOGAMES, payload: videogames });
    } catch (error) {
      console.log(error);
    }
      }
}

export function getGenres(){
  //Peticion a la API
  return async function(dispatch) {
    try {
      const genre = await (await fetch(`http://localhost:3001/genre`)).json();
      dispatch({ type: actions.GET_GENRES, payload: genre});
    } catch (error) {
      console.log(error);
    }
      }
}

export function cleanDetail(){
  return function(dispatch) {
      dispatch({ type: actions.CLEAN_DETAIL, payload: {}});
    } 
}

export function updateFilter(filters){
  return function(dispatch) {
      dispatch({ type: actions.UPDATE_FILTER, payload: filters});
    }
}

export function createVideogame(videogame){
  return async function(dispatch) {
    try {
      console.log(JSON.stringify(videogame))
      const response = await fetch('http://localhost:3001/videogames', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(videogame), // data can be `string` or {object}!
        headers:{'Content-Type': 'application/json'}
      })
      // dispatch({ type: actions.CREATE_VIDEOGAME, payload: response});
    } catch (error) {
      console.log(error);
    }
      }
}
