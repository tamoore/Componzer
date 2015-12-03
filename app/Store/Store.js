import { createStore, combineReducers, applyMiddleware } from 'redux';


const logMiddleware = ({dispatch, getState}) => next => action => {
  typeof action.type === 'string' ? console.log('logMiddleware action received:', action) : null;
  return next(action);
}


const thunkMiddleware = ({dispatch, getState}) => next => action => typeof action === 'function' ?
  action(dispatch, getState) : next(action);


const store = applyMiddleware(logMiddleware, thunkMiddleware)(createStore);


const documentReducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'RES_DOCUMENT':
      return {
        ...state,
        content: JSON.parse(action.data).data
      }
    case 'RES_DOCUMENT_NOT_FOUND':
      return {
        ...state,
        message: action.message
      }
    case 'RES_ERROR':
      return {
        ...state,
        message: action.message

      }
    default:
      return state;
  }
};


const reducer = combineReducers({
  document: documentReducer
});


export const storeInstance = store(reducer);

