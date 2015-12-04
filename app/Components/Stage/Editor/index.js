import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.scss';
import 'style!css!../../../../node_modules/sir-trevor/build/sir-trevor.css';
import 'style!css!./styleOverride.css'; // TODO: bring this into sir-trevor itself
import SirTrevor from 'sir-trevor';
import debounce from 'debounce';

const renderTextArea = data =>
  <textarea ref="editor" className="js-st-instance" defaultValue={data}></textarea>

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    updateDocument: React.PropTypes.func.isRequired
  },

  componentDidMount(){
    this.editor = new SirTrevor.Editor({
      el: ReactDOM.findDOMNode(this.refs.editor),
      blockTypes: ['Text', 'Heading', 'List', 'Quote']
    });

    SirTrevor.EventBus.on('block:content:update', debounce(this.handleSirTrevorUpdate, 500));
    SirTrevor.EventBus.on('block:remove', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.on('block:create:new', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.on('block:create:existing', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.on('block:reorder:dropped', this.handleSirTrevorUpdate);
  },


  handleSirTrevorUpdate(){
    SirTrevor.onBeforeSubmit();
    const data = this.editor.store.retrieve();
    this.props.updateDocument(this.props.id, data);

  },


  componentWillUnmount() {
    SirTrevor.EventBus.off('block:content:update', debounce(this.handleSirTrevorUpdate, 500));
    SirTrevor.EventBus.off('block:remove', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.off('block:create:new', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.off('block:create:existing', this.handleSirTrevorUpdate);
    SirTrevor.EventBus.off('block:reorder:dropped', this.handleSirTrevorUpdate);
  },


  render() {
    const data = this.props.data ?
      JSON.stringify({data: this.props.data.document.content }) : JSON.stringify({data: []});
    return (
      <div className={styles.container}>
        <form>
          {(renderTextArea(data))}
        </form>
      </div>
    );
  }
});
