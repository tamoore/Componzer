import React from 'react';
import styles from './styles.scss';
import SideNav from './SideNav';
import Editor from './Editor';
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: 'AKIAITOVUAFQCD6FXLZQ',
  secretAccessKey: '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' });
const db = new AWS.DynamoDB();

export default React.createClass({
  getInitialState(){
    db.getItem({TableName: 'componer', Key: {id: {S: '2'}}}, (err, res) => {
      if (err) return cb(err)
      if (!res.Item) return cb(new Error('NotFound'))
      this.setState({
        data: res.Item.data.S
      })
    })
    return {
      data: null
    };
  },


  render(){
    const editor = this.state.data ? <Editor data={this.state.data} /> : null;
    return (
      <div className={styles.stage}>
        <SideNav />
        {editor}
      </div>
    );
  }
});



