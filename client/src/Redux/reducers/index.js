import * as actions from '../actions/actionType'

const initialState = {
  videogames: [],
  genres: [],
  videogameDetail: {},
  filters: {
    onlyLocal : false,
    genres : [],
    order : {
      type: 'alphabetic',
      method: 'none' 
    }
  }
};

export default function rootReducer(state=initialState,action){
  switch (action.type){
    case actions.GET_VIDEOGAMES:
      return {
        ...state,
        videogames : action.payload
      }
    case actions.GET_DETAIL:
      return {
        ...state,
        videogameDetail : {...action.payload}
      }
    case actions.SEARCH_VIDEOGAMES:
      return {
        ...state,
        videogames : action.payload
      }
    case actions.GET_GENRES:
      return {
        ...state,
        genres : action.payload
      }
    case actions.CLEAN_DETAIL:
      return {
        ...state,
        videogameDetail : action.payload
      }
    case actions.UPDATE_FILTER:
      return {
        ...state,
        filters : action.payload
      }
    default:
      return state
  }
}