import * as actions from '../actions/actionType'

const initialState = {
  videogames: [],
  genres: [],
  videogameDetail: {},
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
    default:
        return state
  }
}