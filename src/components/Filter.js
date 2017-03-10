import React, {Component} from 'react';

class Filter extends Component{

  setCategory(event){
    this.props.updateQuery({category: event.target.value});
  }

  setOrder(event){
    this.props.updateQuery({order: event.target.value});
  }

  render(){
  return(
    <div className='row'>
    <div className='col-xs-1 hidden-md'></div>
    <div className='col-xs-10 col-md-2 content filter'>
			<div className='row'>
				<div className='col-xs-12'>
					<h2>Filtros</h2>
				</div>
			</div>

        <div className='row'>
        <div className='col-xs-5 col-md-12'>
  			<div className='row radio-buttons' onChange={this.setCategory.bind(this)}>
          
          <div className='col-xs-12'>
            <h3>Categoría</h3>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="category" value="not_started"/><span>Por hacer</span>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="category" value="History" defaultChecked/><span>Histórico</span>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="category" value="finished"/><span>Terminadas</span>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="category" value="not_finished"/><span>Incompletas</span>
          </div>
          </div>
        </div>
        
        <div className='col-xs-5 col-md-12'>
        <div className='row radio-buttons'  onChange={this.setOrder.bind(this)}>
        
          <div className='col-xs-12'>
            <h3>Orden</h3>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="order" value="priorized" defaultChecked/><span>Priorizado</span>
          </div>
          <div className='col-xs-12'>
            <input type="radio" name="order" value="date"/><span>Cronológico</span>
          </div> 
          </div>         
        </div>
        </div>
		</div>
    <div className='col-xs-1 hidden-md'></div>
    </div>
  );
}

}

export default Filter;
