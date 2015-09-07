import React from 'react';
import styles from './styles.scss';
import Logo from './Logo';

export default React.createClass({
  render(){
    return (
      <header className={styles.header}>
        <Logo name="Componentise" />
      </header>
    );
  }
});
