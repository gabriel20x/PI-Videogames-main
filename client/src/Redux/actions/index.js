import * as actions from "./actionType";

export function getVideogames(){
    //Peticion a la API
    return async function(dispatch) {
      try {
        dispatch({ type: actions.IS_LOADING, payload: true });
        const response = await (await fetch(`http://localhost:3001/videogames?page=1`)).json();
        const response2 = await (await fetch(`http://localhost:3001/videogames?page=2`)).json();
        const response3 = await (await fetch(`http://localhost:3001/videogames?page=3`)).json();
        const videogames = [...response,...response2,...response3]
        // const videogames = response
        dispatch({ type: actions.IS_LOADING, payload: false });
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
      dispatch({ type: actions.IS_LOADING, payload: true });
      const response = await fetch(`http://localhost:3001/videogames/${id}`);
      dispatch({ type: actions.IS_LOADING, payload: false });
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
      dispatch({ type: actions.IS_LOADING, payload: true });
      const videogames = await (await fetch(`http://localhost:3001/videogames?name=${name}`)).json();
      dispatch({ type: actions.IS_LOADING, payload: false });
      dispatch({ type: actions.SEARCH_VIDEOGAMES, payload: videogames });
    } catch (error) {
      dispatch({ type: actions.IS_LOADING, payload: false });
      console.log(error);
      dispatch({ type: actions.SEARCH_VIDEOGAMES, payload: [] });
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

// export function updateFilter(filters){
//   return function(dispatch) {
//       dispatch({ type: actions.UPDATE_FILTER, payload: filters});
//     }
// }

export function createVideogame(videogame){
  return async function(dispatch) {
    try {
      const response = await fetch('http://localhost:3001/videogames', {
        method: 'POST',
        body: JSON.stringify(videogame), // data can be `string` or {object}!
        headers:{'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.log(error);
    }
      }
}
