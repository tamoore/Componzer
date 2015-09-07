import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Stage from './Stage';
import globalStyles from './global/styles.scss';

const App = React.createClass({
  render(){
    return (
      <div className={globalStyles.container}>
        <Header name="World" />
        <Stage />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
