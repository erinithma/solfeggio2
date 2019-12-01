import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../reducer'
import middleware from '../middleware';
import { getSize } from '../common';
import a from '../const';
import {modes} from '../const/modes';

const store = createStore(
  createRootReducer(), 
  compose( applyMiddleware(middleware) )
);

function onResize(){
  store.dispatch({type: a.SET_SIZE, payload: {size: getSize()}})
}

$(window).on("load resize", onResize);

window.store = store;

const loc = decodeURIComponent(document.location.pathname);

store.dispatch({
  type: a.SET_MODE,
  payload: {
      mode: modes.get(loc)
  }
})

export default store;
