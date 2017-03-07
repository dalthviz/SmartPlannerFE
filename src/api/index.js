// Eliminar los comentarios del código
import axios from 'axios';
import * as actions from '../actions';
const ROOT_URL = "https://smartplannerbe.herokuapp.com";

export const getUser = (username, callback) => {
    axios.get(ROOT_URL+ "/users?username=" + username)
    .then(response => {
      callback(response.data);
    }).catch(err => {
      callback(err.message);
    });
};

export const updateUser = (userId, user, callback) => {
	axios.put(ROOT_URL+"/users/" + userId, user).then(response => {
        callback(response.data);
    }).catch(err => {
      callback(err.message);
    });
    //return actions.toggleUserLoading();
};

export const getHmks = (userId, category, order, callback) => {
    axios.get(ROOT_URL+ "/users/"+userId+"/hmks?category="+category+"&order="+order)
    .then(response => {
      console.log('getHmks');
      console.log(ROOT_URL+ "/users/"+userId+"/hmks?category="+category+"&order="+order);
      console.log(response.data)
      callback(response.data);
    }).catch(err =>{
      callback(err.message);
    });
    };

export const addHmkToUser = (userId, hmk, callback) => {
    axios.post(ROOT_URL+ "/users/"+userId+"/hmks", hmk)
    .then(response => {
      callback(response.data);
  }).catch(err => {
      callback(err.message);
  });
};

export const updateHmk = (userId, hmkId, hmk, callback) => {
	axios.put(ROOT_URL+"/users/"+userId+"/hmks/"+hmkId, hmk)
    .then(response => {
      callback(response.data);
  }).catch(err => {
      callback(err.message);
  });
};

export const deleteHmk = (userId, hmkId, callback) => {
	axios.delete(ROOT_URL+"/users/"+userId+"/hmks/"+hmkId).then(response => {
        callback(response.data);
    }).catch(err => {
      callback(err.message);
  });
};
