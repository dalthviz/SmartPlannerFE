import axios from 'axios';
import * as actions from '../actions';

const ROOT_URL = "https://smartplannerbe.herokuapp.com";

export const getUser = (username, callback, errCallback) => {
  axios.get(ROOT_URL+ "/users?username=" + username)
  .then(response => {
      //callback(action.getUserOk(response.data));
      callback(response.data);
    }).catch(err => {
      //callback(action.getUserErr(response.data));
      errCallback(err.message);
    });
    //return actions.toggleUserLoading();
  };

  export const updateUser = (userId, user, callback, errCallback) => {
   axios.put(ROOT_URL+"/users/" + userId, user).then(response => {
    callback(response.data);
  }).catch(err => {
    errCallback(err.message);
  });
    //return actions.toggleUserLoading();
  };

  export const getHmks = (userId, category, order, callback,errCallback) => {
    axios.get(ROOT_URL+ "/users/"+userId+"/hmks?category="+category+"&order="+order)
    .then(response => {
      console.log('getHmks');
      console.log(ROOT_URL+ "/users/"+userId+"/hmks?category="+category+"&order="+order);
      console.log(response.data)
      callback(response.data);
    }).catch(err =>{
      errCallback(err.message);
    });
  };
    //return actions.toggleHmkLoading()};

    export const addHmkToUser = (userId, hmk, callback, errCallback) => {
      axios.post(ROOT_URL+ "/users/"+userId+"/hmks", hmk)
      .then(response => {
        callback(response.data);
      }).catch(err => {
        errCallback(err.message);
      });
    //retornar actions.postHmkOk() o actions.postHmkErr() segun el caso
  };

  export const updateHmk = (userId, hmkId, hmk, callback, errCallback) => {
   axios.put(ROOT_URL+"/users/"+userId+"/hmks/"+hmkId, hmk)
   .then(response => {
    callback(response.data);
  }).catch(err => {
    errCallback(err.message);
  });
  //return actions.toggleHmkLoading();
};

export const deleteHmk = (userId, hmkId, callback, errCallback) => {
	axios.delete(ROOT_URL+"/users/"+userId+"/hmks/"+hmkId).then(response => {
    callback(response.data);
  }).catch(err => {
    errCallback(err.message);
  });
    //return actions.toggleHmkLoading();
  };
