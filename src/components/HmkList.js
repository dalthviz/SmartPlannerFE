import React, { Component } from 'react';
import Hmk from './Hmk';

class HmkList extends Component {

	render(){
		//console.log('HmkList');
		//console.log(this);
		//console.log(this.props.hmkList);
		var mensaje = '';
		if (this.props.hmkList.length > 0) mensaje = 'Estas son las tareas que tienes.';
		else mensaje = 'No tienes tareas con los filtros dados.';
	return (
		<div className='col-md-8 content'>
			<div className='row'>
				<div className='col-xs-12'>
					<h1>¡Hola {this.props.user.user_name}!</h1>
					<p><br />{mensaje}</p>
				</div>
			</div>
			<div className='row'>
			{ this.props.hmkList.map(hmk => {
      			return <Hmk key={hmk._id} hmk={hmk} modalAction={this.props.updateHmk}  deleteHmk={this.props.deleteHmk}
																												  toggleEditHmk={this.props.toggleEditHmk}
																												  resetView={this.props.resetEditView}/>
    		})}
		</div>
		</div>
		);
	}
}
/*
HmkList.propTypes = {
  userId: PropTypes.object,
  hmkList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  deleteHmk: PropTypes.func,
  editHmk: PropTypes.func
};
*/
export default HmkList;
