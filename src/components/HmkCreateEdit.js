import React, {Component } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';
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
        done_percentage: (hmkObj.done_percentage || 0),
        importance: hmkObj.importance || 0
    }
    var me = this;
    if(this.props.reset) this.props.reset(this.r.bind(this));
    console.log(this.state);
  }

  r = function (obj, str) {
      this.resetHmk(obj, str);
  };

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

  addEditHmk = () => {
    this.props.addCreateHmk(Object.assign({}, this.state));
  };

  getAction = () => {
    return "";
  }

  resetHmk = (hmk, str) => {
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
    this.getAction = () => {return str};
    this.hideErr();
    this.hideLoading();
  };

  close = (e) => {
    e.preventDefault();
    this.hideLoading();
    this.hideErr();
    this.props.toggleModal('hidden');
  };

  send = (e) => {
    e.preventDefault();
    this.showLoading();
    var str = this.getAction();
    this.props.modalAction(this.state, str, this.showErr, this.hide);
  };

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

  hide = ()=> {
    this.props.toggleModal('hidden');
  };


  changeDate = (d) => {
    console.log(this.state.limit_date);
    console.log(d);
    try {
      new Date(d);
      this.setState({'limit_date':d});
    }catch(e){
      this.setState({'limit_date':moment()});
    }
  }


  render() {
    return (
      //TODO estructura de un elemento tarea
      <div className="row fixed-container">
      <div className="col-xs-1"></div>
      <div className={"hmk-edit-container col-xs-10 "+this.props.show}>
      
      <div className="col-xs-12">
        <div className="row">
        <div className="col-xs-12">
        <h3>{this.getAction()} una tarea</h3>
        </div>
        </div>
        <form>

          <div className="form-group row">
            <div className="col-xs-4 col-sm-3">
              <label htmlFor="email">Nombre<span className="red">*</span>:</label>
            </div>
            <div className="col-xs-8 col-sm-9">
              <input id="name" name="name" type="text" placeholder="ej. Ejercicios matemáticas" value={this.state.name}
                onChange={this.setText} required="required" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-4 col-sm-3">
              <label htmlFor="limit_date">Fecha límite<span className="red">*</span>:</label>
            </div>
            <div className="col-xs-8 col-sm-4" disabled>
              <Datetime
              dateFormat="DD/MM/YY"
              value={this.state.limit_date}
              onChange={this.changeDate}
              placeholderText="Select a date between today and 5 days in the future" required="required"/>
            </div>
          </div>

          <div className="form-group row">
          <div className="col-xs-4 col-sm-3">
            <label htmlFor="description">Descripción:</label>
            </div>
            <div className="col-xs-8 col-sm-9">
            <textarea id="description" rows={5} name="description" type="text" placeholder="ej. Del libro x, capítulo 2, ejercicios 1 al 10 impares" value={this.state.description}
            onChange={this.setText}/>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-4 col-sm-3">
            <label htmlFor="estimated_time">Tiempo estimado (horas)<span className="red">*</span>:</label>
            </div>
            <div className="col-xs-4 col-sm-3">
              <input id="estimated_time" name="estimated_time" type="number" min="0" vaule={this.state.estimated_time+""}
              onChange={this.setEstimatedTime} required="required" />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4 col-sm-3">
            <label htmlFor="done_percentage">Progreso (%):</label>
            </div>
            <div className="col-xs-4 col-sm-3">
            <input id="done_percentage" name="done_percentage" type="number" min="0" max="100" vaule={this.state.done_percentage+""}
            onChange={this.verifyPercentage}/>
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-5 col-sm-3">
            <label htmlFor="importance">Importancia:</label>
          </div>
          <div className="col-xs-7 col-sm-4">
          <div className="row">
            <div className="col-xs-4">
              <label><input id="importance" type="radio" name="importance" value="0" checked={this.state.importance===0}
                      onChange={this.setImportance} /> Baja</label>
            </div>
            <div className="col-xs-4">
            <label><input type="radio" name="importance" value="1" checked={this.state.importance===1}
                      onChange={this.setImportance}  /> Media</label>
            </div>
            <div className="col-xs-4">
              <label><input type="radio" name="importance" value="2" checked={this.state.importance===2}
                      onChange={this.setImportance}  /> Alta</label>
            </div>           

          </div>
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

export default HmkCreateEdit;
