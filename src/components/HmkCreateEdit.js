import React, {Component } from 'react';
import axios from 'axios';
import * as api from '../api';
//TODO url Back-End

class HmkCreateEdit extends Component {
  constructor(props) {
    super(props);
    var hmkObj = this.props.hmk || {};
    console.log(hmkObj);
    this.state = {
        _id: hmkObj._id,
        name: hmkObj.name || '',
        description: hmkObj.description || '',
        estimated_time: hmkObj.estimated_time || 0,
        limit_date: hmkObj.limit_date || new Date().getTime(),
        done_percentage: (hmkObj.done_percentage || 0)*100,
        importance: hmkObj.importance || 0
    }
    var me = this;
    if(this.props.reset) this.props.reset(this.r.bind(this));
    console.log(this.state);
  }

  r = function (obj) {
      this.resetHmk(obj);
  }

  setImportance = (e) => {
    if(e.target.checked) this.setState({[e.target.name]: Number(e.target.value)});
    console.log(this.state);
  };

  verifyPercentage = (e) => {
    if(Number(e.target.value) > Number(e.target.max)) e.target.value=e.target.max;
    else if(Number(e.target.value) < Number(e.target.min)) e.target.value=e.target.min;
    this.setState({[e.target.name]: Number(e.target.value)});
  };

  setText = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  setEstimatedTime = (e) => {
    if(Number(e.target.value)< Number(e.target.min)) e.target.value = e.target.min;
    this.setState({[e.target.name]: Number(e.target.value)*3600000});
  };

  getAction = () => {
    if(this.props.hmk) return 'Edita';
    return 'Agrega';
  };

  addEditHmk = () => {
    this.props.addCreateHmk(Object.assign({}, this.state));
  };

  resetHmk = (hmk) => {
    if (hmk && hmk._id)this.setState(hmk);
    else this.setState({
        _id: undefined,
        name: '',
        description: '',
        estimated_time: 0,
        limit_date: new Date().getTime(),
        done_percentage: 0,
        importance: 0
    });
  };

  close = (e) => {
    e.preventDefault();
    this.props.toggleModal('hidden');
  };

  send = (e) => {
    e.preventDefault();
    this.setState({'done_percentage':this.state.done_percentage/100});
    this.props.modalAction(this.state);
    this.props.toggleModal('hidden');
  }


  render() {
    return (
      //TODO estructura de un elemento tarea
      <div className="row">
      <div className="col-xs-2"></div>
      <div className={"hmk-edit-container col-xs-12 "+this.props.show}>
      
      <div className="col-xs-12">
        <div className="row">
        <div className="col-xs-12">
        <h3>{this.getAction()} una tarea</h3>
        </div>
        </div>
        <form>

          <div className="form-group row">
            <div className="col-xs-4">
              <label htmlFor="email">Nombre:</label>
            </div>
            <div className="col-xs-8">
              <input id="name" name="name" type="text" placeholder="ej. Ejercicios matemáticas" value={this.state.name}
                onChange={this.setText}/>
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label htmlFor="description">Descripción:</label>
            </div>
            <div className="col-xs-8">
            <textarea id="description" rows={5} name="description" type="text" placeholder="ej. Del libro x, capítulo 2, ejercicios 1 al 10 impares" value={this.state.description}
            onChange={this.setText}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xs-4">
            <label htmlFor="estimated_time">Tiempo estimado (horas):</label>
            </div>
            <div className="col-xs-8">
              <input id="estimated_time" name="estimated_time" type="number" min="0" vaule={this.state.estimated_time}
              onChange={this.setEstimatedTime} />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label htmlFor="done_percentage">Progreso (%):</label>
            </div>
            <div className="col-xs-8">
            <input id="done_percentage" name="done_percentage" type="number" min="0" max="100" vaule={this.state.done_percentage}
            onChange={this.verifyPercentage}/>
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label htmlFor="importance">Importancia:</label>
          </div>
          <div className="col-xs-8">
          <input id="importance" type="radio" name="importance" value="0" checked={this.state.importance===0}
                      onChange={this.setImportance} /> Baja
                      <input type="radio" name="importance" value="1" checked={this.state.importance===1}
                      onChange={this.setImportance}  /> Media
                      <input type="radio" name="importance" value="2" checked={this.state.importance===2}
                      onChange={this.setImportance}  /> Alta

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
      </div>
        <div className="col-xs-2"></div>
        </div>
    );
  }
}

export default HmkCreateEdit;
