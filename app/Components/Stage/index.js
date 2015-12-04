import React from 'react';
import styles from './styles.scss';
import SideNav from './SideNav';
import Editor from './Editor';
import Container from '../Containers/EditorContainer.js';
import {storeInstance} from '../../Store/Store.js';
import * as ActionsCreator from '../../Actions/DocumentCreators.js';


export default React.createClass({
  handleDocumentUpdate(id, data){
    storeInstance.dispatch(ActionsCreator.updateDocument(id, data));
  },

  render(){
    return (
      <div className={styles.stage}>
        <SideNav />
        <Container>
          {(({data, id}) => id ?
            <Editor {...this.props} id={id} updateDocument={this.handleDocumentUpdate} /> : null

          )}
        </Container>
      </div>
    );
  }
});



