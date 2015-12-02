import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.scss';
import 'style!css!../../../node_modules/sir-trevor/build/sir-trevor.css';
import 'style!css!./styleOverride.css'; // TODO: bring this into sir-trevor itself
import SirTrevor from 'sir-trevor';

export default React.createClass({
  componentDidMount(){
    const lambda = new AWS.Lambda();
    const params = {FunctionName: 'hellowWorldLamba'};
    const id = "2";

    const editor = new SirTrevor.Editor({
      el: ReactDOM.findDOMNode(this.refs.editor),
      blockTypes: ['Text', 'Heading', 'List', 'Quote']
    });

    this.timer = setInterval(()=> {
      SirTrevor.onBeforeSubmit();
      const data = editor.store.retrieve();
      if(data.data.length){
        params.Payload = JSON.stringify({id: id,  data: editor.store.retrieve()});
        lambda.invoke(params, (err, data)=>{
          console.log(err, data);
        });
      }
    }, 500);
    // TODO: Fire on diff
    // TODO: suspend if session of another browser

  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },


  render() {
    const data = this.props.data ? this.props.data : JSON.stringify({data: []});
    return (
      <div className={styles.container}>
        <form>
          <textarea ref="editor" className="js-st-instance" defaultValue={data}></textarea>
        </form>
      </div>
    );
  }
});
