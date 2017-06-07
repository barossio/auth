import {AUTH_ERROR_CLEAR} from './types';


export function clearError(){
    return function(dispatch) {
        dispatch({type : AUTH_ERROR_CLEAR});
    }

}
