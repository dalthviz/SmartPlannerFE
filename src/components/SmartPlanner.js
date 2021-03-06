import React, {Component} from 'react';
import axios from 'axios';
import HmkList from './HmkList';
import HmkCreateEdit from './HmkCreateEdit';
import NavBar from './NavBar';
import Login from './Login';
import Filter from './Filter';
import * as api from '../api';

class SmartPlanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hmks : [],
      login: 'show',
      createEditShow: 'hidden',
      userEditShow: 'hidden',
      hmkEditor: 'hidden',
      user: {'user_name':''},
      category: 'history',
      order: 'priorized'
    }

  }

  /*obtiene al usurio con username dado*/
  getUser = (username, callback, errCallback) => { api.getUser(username, (user)=>{
                                                          console.log('este '+user);
                                                          this.setState({'user':user});
                                                          if(callback) callback(user);
                                                        }, errCallback)};

  /*Obtiene las tareas con parametros dados*/
  getHmks = (userId, category, order, callback, errCallback) => { api.getHmks(userId, category, order, callback, errCallback)};

  /*establece el nuevo usuario actual*/
  setUser = ( obj ) => {
    console.log("set user");
    console.log(obj);
    this.getHmks(obj[0]._id, this.state.category, this.state.order, (hmks)=>{ //se estan pidiendo inicialmente todas las tareas
        console.log('tareas');
        console.log(hmks);
        this.setState({login:'hidden', user:obj[0], hmks: hmks});
      });
  };

  //resetHmk = ()=>{};

  resetCreateForm = (callback) => {
    this.resetHmk = (obj, str) => {callback(obj, str);}
  };

  resetEditView = (obj, str) =>{
    this.resetHmk(obj, str);
  };

  /*Actualiza las tareas teniendo en cuenta parametros de filtro cambiados*/
  updateQuery = (query) => {
    var userId = this.state.user._id;
    var category = query.category || this.state.category;
    var order = query.order || this.state.order;
    this.setState({category:category,
                   order:order});
    this.getHmks(userId, category, order, (hmks)=>{
        console.log('tareas actualizadas por filtro');
        console.log(hmks);
        this.setState({'hmks': hmks});
      });
  }

  /*Agregar tarea al usurio actual*/
  postHmk = (hmk, str, errCallback, callback) => {
    if(str === 'Editar'){
      this.updateHmk(hmk, errCallback, callback);
    }else{
    var userId = this.state.user._id;
    api.addHmkToUser(userId, hmk,(resp) => {
      console.log('Respuesta post tarea');
      console.log(resp);
      callback();
      this.updateQuery({});
    }, errCallback);
    }
  }

  /*Elimina una tarea del usuario actual*/
  deleteHmk = (hmkId, errCallback) => {
    var userId = this.state.user._id;
    api.deleteHmk(userId, hmkId, (resp) => {
      console.log('Respuesta delete tarea');
      console.log(resp);
      this.updateQuery({});
    }, errCallback);
  }

  /*Actualiza una tarea*/
  updateHmk = (hmk, errCallback, callback) => {
    var userId = this.state.user._id;
    var hmkId = hmk._id;
    hmk.done_percentage = hmk.done_percentage;
    api.updateHmk(userId, hmkId, hmk, (resp) => {
      console.log('Respuesta put tarea');
      console.log(resp);
      callback();
      this.updateQuery({});
    }, errCallback);
  }

  /*Agregar tarea al usurio actual*/
  postUser = (user, errCallback, callback) => {
    var userId = this.state.user._id;
    api.updateUser(userId, user,(resp) => {
      console.log('Respuesta post usuario');
      console.log(resp);
      callback();
      this.getUser(user.user_name);
    }, errCallback);
  }

  render() {
    console.log('SP');
    console.log(this);
    return(
      <div>
        <Login getUser={this.getUser} setUser={this.setUser} user={this.state.user} login={this.state.login}/>
        <NavBar user={this.state.user} postUser={this.postUser} postHmk={this.postHmk} toggleLogin={(loginState) => {this.setState({login: loginState})}}
                                       toggleAddHmk={(addState) => {this.setState({createEditShow: addState})}}
                                        addHmk={this.state.createEditShow}
                                        toggleEditUser={(addState)=>{this.setState({userEditShow: addState})}}
                                        editUser={this.state.userEditShow} resetCreateForm={this.resetCreateForm}/>
        <div className="row">
        <HmkList user={this.state.user} hmkList={this.state.hmks} updateHmk={this.updateHmk} deleteHmk={this.deleteHmk}
                                        toggleEditHmk={(addState) => {this.setState({createEditShow: addState})}}
                                        resetEditView={this.resetEditView}/>
        <div className="col-md-2"></div>
        <Filter updateQuery={this.updateQuery}/>
      </div>
      </div>
    )
  }
}

export default SmartPlanner;
