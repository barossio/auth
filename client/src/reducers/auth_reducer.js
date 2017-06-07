import {AUTH_USER , UNAUTH_USER , AUTH_ERROR,AUTH_ERROR_CLEAR,FETCH_MESSAGE} from '../actions/types';

export default function (state = {} , action){
  switch (action.type) {
    case AUTH_USER :
      return { ... state , error : null, authenticated : true}
    case UNAUTH_USER :
      return { ... state , error : null, authenticated : false}
    case AUTH_ERROR :
      return { ... state , error : action.payload}
    case AUTH_ERROR_CLEAR :
      return { ... state , error : null}
    case FETCH_MESSAGE :
      return { ... state , message : action.payload}
  }
  return state;
}
