import React, {Component } from 'react';
import axios from 'axios';
import * as api from '../api';
//TODO url Back-End

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.user);
    console.log(this.state);
    if(this.props.reset) this.props.reset(this.resetUser);
  }

  hideLoading = () => {
    var load = this.refs.loading;
    load.classList.remove('visible');
    load.classList.add('hidden');
  };

  hideErr = () => {
    var err = this.refs.error;

    err.classList.remove('visible');
    err.classList.add('hidden');
  };

  showLoading = () => {
    this.hideErr();
    var load = this.refs.loading;
    load.classList.remove('hidden');
    load.classList.add('visible');
    console.log(load);
  };

  showErr = () => {
    this.hideLoading();
    var err = this.refs.error;
    err.classList.remove('hidden');
    err.classList.add('visible');
  };

  setSubscribed = (e) => {
    this.setState({[e.target.name]: e.target.checked});
  };

  setText = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  getAction = () => {
    if(this.props.user) return 'Edita';
    return 'Agrega';
  };

  close = (e) => {
    e.preventDefault();
    this.hideLoading();
    this.hideErr();
    this.hide();
  };

  resetUser = (user) => {
    this.setState(user);
  };

  send = (e) => {
    e.preventDefault();
    this.showLoading();
    this.props.modalAction(this.state, this.showErr, this.hide);
  };

  hide = () => {
    this.hideErr();
    this.hideLoading();
    this.props.toggleModal('hidden');
  };


  render() {
    return (
      //TODO estructura de un elemento tarea
      <div className="row fixed-container">
      <div className="col-xs-1"></div>
      <div className={"hmk-edit-container col-xs-10 "+this.props.show}>
      
      <div className="col-xs-12">
        <div className="row">
        <div className="col-xs-12">
        <h3>{this.getAction()} un usuario</h3>
        </div>
        </div>
        <form>

          <div className="form-group row">
            <div className="col-xs-4">
              <label htmlFor="email">Nombre:</label>
            </div>
            <div className="col-xs-8">
              <input id="user_name" name="user_name" type="text" placeholder="Ingrese su nombre" value={this.state.user_name}
                onChange={this.setText} />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label htmlFor="description">Email:</label>
            </div>
            <div className="col-xs-8">
            <input id="email" name="email" type="email" placeholder="ejemplo@ejemplo.com" value={this.state.email}
            onChange={this.setText}/>
            </div>
          </div>
          
          <div className="form-group row">
          <div className="col-xs-9">
            <label htmlFor="importance">¿Recibir email con tareas ordenadas los sabados? </label>
          </div>
          <div className="col-xs-3">
          <input id="subscribed" type="checkbox" name="subscribed" checked={this.state.subscribed==="true"}
                      onChange={this.setSubscribed} />

          </div>
          </div>
          
          <div className="row">
            <div className="col-sm-7 col-xs-2"></div>
            <div className="col-sm-1 col-xs-2">    
              <div ref="loading" className="loading-hmk hidden"></div>
              <div ref="error" className="red hidden">Error</div>
            </div>
            <div className="col-sm-2 col-xs-4">    
              <button className="btn btn-danger add-hmk-cancel" onClick={this.close}>Cancelar</button>
            </div>
            <div className="col-sm-2 col-xs-4" >    
              <button className="btn btn-primary add-hmk-accept" onClick={this.send}>Aceptar</button>
            </div>            
          </div>

        </form>
        </div>
      </div>
        <div className="col-xs-1"></div>
        </div>
    );
  }
}

export default UserEdit;
