import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Stage from './Components/Stage';
import globalStyles from './global/styles.scss';
import {storeInstance} from './Store/Store.js';

const App = React.createClass({
  render(){

    return (
      <div className={globalStyles.container}>
        <Header />
        <Stage  />
      </div>
    );
  }
});

const Provider = React.createClass({
  childContextTypes: {
    store: React.PropTypes.object
  },
  getChildContext(){
    return {
      store: this.props.store
    }
  },
  render(){
    return this.props.children;
  }
});


const render = () => {
  ReactDOM.render(
    <Provider store={storeInstance}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};
render();

