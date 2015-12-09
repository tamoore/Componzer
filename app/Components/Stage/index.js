import React from 'react';
import styles from './styles.scss';
import SideNav from './SideNav';
import Editor from './Editor';
import Container from '../Containers/EditorContainer.js';
import * as ActionsCreator from '../../Actions/DocumentCreators.js';


export default React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },
  getInitialState(){
    return {
      document: null
    }
  },
  handleDocumentUpdate(id, data){
    this.context.store.dispatch(ActionsCreator.updateDocument(id, data));
  },
  componentDidMount(){
    this.context.store.subscribe(this.onChange)
  },
  onChange(){
    const {document} = this.context.store.getState();
    this.setState({
      document
    })
  },
  render(){
    return (
      <div className={styles.stage}>
        <SideNav />
        <Container>
          {(id => id ?
            <Editor id={id} data={this.state.document}
              updateDocument={this.handleDocumentUpdate} /> : null
          )}
        </Container>
      </div>
    );
  }
});



