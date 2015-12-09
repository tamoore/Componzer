import React from 'react';
import * as ActionsCreator from '../../Actions/DocumentCreators.js';
import {storeInstance} from '../../Store/Store.js';
import queryString from 'query-string';
import uuid from 'node-uuid';

const parsed = queryString.parse(location.search);
let id = '';

export default React.createClass({
  componentDidMount(){
    if(parsed.id){
      id = parsed.id;
      storeInstance.dispatch(ActionsCreator.getDocument(id));
    }else{
      id = uuid.v4();
      storeInstance.dispatch(ActionsCreator.getDocument(''));
      window.history.pushState({}, "", location.search + '?' +
        queryString.stringify({id: id}));
    }
  },
  render(){
    const {children: render} = this.props;
    return render(id);
  }
});

