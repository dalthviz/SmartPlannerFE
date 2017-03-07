import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import SmartPlanner from './components/SmartPlanner';
//Eliminar los comentarios de código
ReactDOM.render(<SmartPlanner />, document.querySelector('.container'));
