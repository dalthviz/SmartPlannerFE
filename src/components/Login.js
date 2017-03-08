import React, {Component} from 'react';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state={
			'user_name':'',
			'pass':'',
			'err':'hidden',
			'loading':'hidden'
		};
	}

	login = (e) => {
		e.preventDefault();
		this.setState({'err':'hidden', 'loading':'visible'});
		this.props.getUser(this.state.user_name, (obj)=>{
	  		this.props.setUser(obj);
	  		this.setState({'err':'hidden', 'loading':'hidden'});
	  	}, ()=>{this.setState({'err':'visible', 'loading':'hidden'})});
	  	this.forceUpdate();
	};

	setText = (e) => {
    	this.setState({[e.target.name]: e.target.value});
  	};

		render() {
	    console.log('login');
	    console.log(this);
            return(
      <div className={this.props.login+' login'}>
      <div className='row'>
      	<img src='./style/imgs/smartPlanner.png' className='login-logo'/>
      </div>
	  <div className='row'>
	  <div className='col-xs-1 col-md-3'></div>
	  <div className='col-xs-10 col-md-6'>
	  	<div className='row'>
	  	<h2 className='login-message'>¡Bienvenido a Smart Planner, tu agenda inteligente!</h2>
	  	</div>
	  	<div className='row login-form'>
	  	<div className='col-xs-1 col-md-3'></div>
	  	<div className='col-xs-10 col-md-6'>
	  	 <form>
          <div className="form-group row">
            <div className="col-xs-12">
              <input id="user_name" name="user_name" type="text" placeholder="Nombre usuario" value={this.state.user_name}
                onChange={this.setText} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xs-12">
              <input id="pass" name="pass" type="password" placeholder="clave" value={this.state.pass}
                onChange={this.setText} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={this.login}>Login</button>
              <p className={this.state.err+' error-message'}> Error, usuario o clave incorrectos</p>
              
              <div className={this.state.loading+' loading-circle'}>
              <div id="floatingCirclesG">
					<div className="blue_f_circleG" id="frotateG_01"></div>
					<div className="blue_f_circleG" id="frotateG_02"></div>
					<div className="blue_f_circleG" id="frotateG_03"></div>
					<div className="blue_f_circleG" id="frotateG_04"></div>
					<div className="blue_f_circleG_circleG" id="frotateG_05"></div>
					<div className="blue_f_circleG" id="frotateG_06"></div>
					<div className="blue_f_circleG" id="frotateG_07"></div>
					<div className="blue_f_circleG" id="frotateG_08"></div>
					<div className="blue_f_circleG" id="frotateG_09"></div>
				</div>
				</div>

            </div>
          </div>
          </form>
	  	</div>
	  	</div>
	  </div>
	  <div className='col-xs-1 col-md-3'></div>
	  </div>
	  </div>
);
	}

}

export default Login;
