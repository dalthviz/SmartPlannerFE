import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import * as api from '../api';
//TODO url Back-End

class Hmk extends Component {


  show = (obj) => {
    this.props.resetView(obj);
    this.props.toggleEditHmk('show');
  };
  customFormat = (date, formatString) =>{
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=date.getFullYear())+"").slice(-2);
  MM = (M=date.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=date.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=date.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=date.getMinutes())<10?('0'+m):m;
  ss=(s=date.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

priority = (num) => {
  console.log(num);
  switch (num){
    case 0: return "green";
    case 1: return "yellow";
    case 2: return "red";
    default: return "green";
  }
};

getDonePercentage = () => {
  return (this.props.hmk.done_percentage*100)+"";
};

getDonePercentage2 = () => {
  return this.props.hmk.done_percentage+"%";
}

  render() {

    console.log('Hmk');
    console.log(this);
    var limit = this.props.hmk.limit_date,
    date = this.customFormat(new Date(limit), "#DD#/#MM#/#YYYY# #hh#:#mm#" );
    var style = {'width': this.getDonePercentage2()};
    return (
      <div className="hmk-container col-xs-12">
        <div className="row">
          <div className="col-xs-10">
          <div className="row">
              <div className="col-xs-4">
                <h3 className="remove-margin inline">{this.props.hmk.name}</h3>
              </div>
              <div className="col-xs-1">
                <a title="Editar" href="" onClick={(e) => {e.preventDefault();this.show(this.props.hmk)}}><span className="glyphicon glyphicon-edit" ></span></a>
              </div>
              <div className="col-xs-1">
                <a title="Eliminar" href="" onClick={(e)=>{e.preventDefault();this.props.deleteHmk(this.props.hmk._id)}}><span className="glyphicon glyphicon-trash"></span></a>
              </div>
              <div className="col-xs-6"></div>
          </div>
          </div>
          <div className="col-xs-2">
              <span className={"glyphicon glyphicon-exclamation-sign " + this.priority(this.props.hmk.importance)}></span>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-8">
            <p><h4 className="inline">Descripción:</h4>{this.props.hmk.description}</p>
          </div>
          <div className="col-xs-4">

          <p><h4 className="inline">Hasta: </h4>{date}</p>
          </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
              <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow={this.getDonePercentage()}
                  aria-valuemin="0" aria-valuemax="100" style={style} >
                  <span className="sr-only">70% Complete</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
/*
Hmk.propTypes = {
  _id: PropTypes.string,
  name: "Tarea prueba post2",
  description: "Esta es otra tarea de prueba",
  estimated_time: 36000,
  limit_date: 1520337600000,
  done_percentage: 0,
  importance: PropTypes.number,
  userId: PropTypes.object,
  deleteHmk: PropTypes.func,
  editHmk: PropTypes.func
};
*/
export default Hmk;
