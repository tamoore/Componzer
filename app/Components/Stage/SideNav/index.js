import React from 'react';
import styles from './styles.scss';


export default React.createClass({
  contextTypes: {
    data: React.PropTypes.object
  },
  render(){
    return (
      <nav className={styles.container}>
      </nav>
    );
  }
});
