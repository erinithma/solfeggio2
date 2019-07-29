import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../reducer'
import middleware from '../middleware';
import { getSize } from '../common';
import a from '../const';

const store = createStore(
  createRootReducer(), 
  compose( applyMiddleware(middleware) )
);

function onResize(){
  store.dispatch({type: a.SET_SIZE, payload: {size: getSize()}})
}

$(window).on("load resize", onResize);

window.store = store;

export default store;
