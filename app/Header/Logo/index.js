import React from "react";
import styles from './styles.scss';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },


  render(){
    return (
      <span className={styles.logo}>{this.props.name}</span>
    );
  }
});
