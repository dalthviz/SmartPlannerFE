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
    this.props.toggleModal('hidden');
  };

  resetUser = (user) => {
    this.setState(user);
  };

  send = (e) => {
    e.preventDefault();
    this.props.modalAction(this.state);
    this.props.toggleModal('hidden');
  }


  render() {
    return (
      //TODO estructura de un elemento tarea
      <div className={"hmk-edit-container "+this.props.show}>
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
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={this.send}>Ok</button>
              <button className="btn btn-danger" onClick={this.close}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserEdit;
