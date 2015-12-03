import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Stage from './Components/Stage';
import globalStyles from './global/styles.scss';

import * as ActionsCreator from './Actions/DocumentCreators.js';
import {storeInstance} from './Store/Store.js';

storeInstance.dispatch(ActionsCreator.getDocument('2'));

const App = React.createClass({
  render(){
    return (
      <div className={globalStyles.container}>
        <Header />
        <Stage {...this.props} />
      </div>
    );
  }
});

const render = () => {
  ReactDOM.render(
    <App data={storeInstance.getState()}   />,
    document.getElementById('app')
  );
};

storeInstance.subscribe(render);

