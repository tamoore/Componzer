import React from 'react';
import styles from './styles.scss';
import SideNav from './SideNav';
import Editor from './Editor';

export default React.createClass({
  render(){
    return (
      <div className={styles.stage}>
        <SideNav />
        <Editor {...this.props} />
      </div>
    );
  }
});



