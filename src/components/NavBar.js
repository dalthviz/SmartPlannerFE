import React, {Component} from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import HmkCreateEdit from './HmkCreateEdit';
import UserEdit from './UserEdit';

class NavBar extends Component {

  resetCreateForm = (callback) => {
    this.props.resetCreateForm(callback);
    this.resetHmk = (obj) => {callback(obj);}
  };

  resetUserForm = (callback) => {
    this.resetUser = (obj) => {callback(this.props.user);}
  };

	render() {
    console.log('navbar');
    console.log(this);
		return(
      <div>
<nav className="navbar navbar-default sp-nav-style">
    <div className="navbar-header sp-nav-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar white"></span>
        <span className="icon-bar white"></span>
        <span className="icon-bar white"></span>
      </button>
      <a className="navbar-brand" href="#">
      			<img alt="Smart Planner" src="./style/imgs/smartPlanner.png" className="logo_img" />
      </a>
    </div>
    <div className="navbar-collapse collapse" id="myNavbar">
    <div className="sp-nav-links">
      <ul className="nav navbar-nav navbar-right sp-nav-options">
        <li><a href="#" onClick={() => {
          this.resetUser();
          this.props.toggleEditUser('show');
        }}>Editar Usuario</a></li>
        <li><a href="#" onClick={() => {
          this.resetHmk();
          this.props.toggleAddHmk('show');
        }}>Crear Tarea</a></li>
        <li><a href="#" onClick={() => {
          if(this.reset) this.reset();
          this.props.toggleLogin('show')
        }}><span className="glyphicon glyphicon-log-in"></span> Cambiar Usuario</a></li>
      </ul>
      </div>
    </div>
  </nav>
  <HmkCreateEdit show={this.props.addHmk} modalAction={this.props.postHmk} toggleModal={this.props.toggleAddHmk} reset={this.resetCreateForm}/>
  <UserEdit user={this.props.user} show={this.props.editUser} modalAction={this.props.postUser} toggleModal={this.props.toggleEditUser} reset={this.resetUserForm}/>
  </div>
      );

	}

}

export default NavBar;
/*

      <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">
      			<img alt="Smart Planner" src="./style/imgs/smartPlanner.png" className="logo_img" />
      </a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav navbar-right">
      	<li>prueba</li>
        <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>
*/
