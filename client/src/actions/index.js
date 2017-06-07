import axios from 'axios';
import {AUTH_USER , UNAUTH_USER ,AUTH_ERROR,FETCH_MESSAGE} from './types';


const ROOT_URL = 'http://localhost:3090';

export function signinUser({email , password} , callback){
  console.log(email, password );
  return function(dispatch) {
    //Submit email/password to the server
    axios.post(ROOT_URL +'/signin' , {email , password})
    .then(response=>{
      //If request is good
      // - update state to indicate user is authenticated
      dispatch({type : AUTH_USER});
      // - Save the JWT token
      localStorage.setItem('token' , response.data.token);
      // - redirect to the route '/feature'
      callback();
    })
    .catch(()=>{
      //If request is bad
      // - show error message
     //  dispatch({type : ...})
     dispatch(authError('Bad Login Info'));

    })


  }
}


export function signupUser({email , password} , callback){
  return function(dispatch) {
    //Submit email/password to the server
    axios.post(ROOT_URL +'/signup' , {email , password})
    .then(response=>{
      //If request is good
      // - update state to indicate user is authenticated
      dispatch({type : AUTH_USER});
      // - Save the JWT token
      localStorage.setItem('token' , response.data.token);
      // - redirect to the route '/feature'
      callback();
    })
    .catch(error=>{
      //If request is bad
      // - show error message
     //  dispatch({type : ...})
     console.log(error.response.data);
      dispatch(authError(error.response.data.error));
    })


  }
}

export function signoutUser(){
  /*return function(dispatch){
      localStorage.removeItem('token' );
      dispatch({type : UNAUTH_USER});
  }*/
    localStorage.removeItem('token' );
    return {type : UNAUTH_USER};
}


export function authError(error){
  return {
    type : AUTH_ERROR ,
    payload : error
  }
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL , {
      headers : {Authorization: 'Bearer '+ localStorage.getItem('token')}
    })
    .then(response =>{
      dispatch({
        type:FETCH_MESSAGE,
        payload:response.data.message
      })
    })
  }
}

export * from './error_action';
