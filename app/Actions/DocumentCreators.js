import {AWSSetup, DynamoDB, Lambda} from './AWSWrapper.js';


const AWS = AWSSetup('us-east-1')('AKIAITOVUAFQCD6FXLZQ')
                                  ('dmroAG3I4TDtxhcKT0TY+jB5mtbLEn3Zy3LvzabW');

// TODO: add cognito

export const updateDocument = (id = '', data = {}) => dispatch => {
  const params = {FunctionName: 'hellowWorldLamba'};
  params.Payload = JSON.stringify({id: id,  data});
  AWS.Lambda.invoke(params, (err, data)=>{
    dispatch({
      type: 'RES_DOCUMENT',
      id,
      data: data.Payload
    });
  });
};

export const getDocument = (id = '') => dispatch => {
  AWS.DynamoDB.getItem({TableName: 'componer', Key: {id: {S: id}}}, (err, res) => {
    if (err){
      return dispatch({
        type: 'RES_ERROR',
        id,
        message: 'An error occurred.'
      });
    }

    if (!res.Item){
      return dispatch({
        type: 'RES_DOCUMENT_NOT_FOUND',
        id,
        message: 'The doucment could not be found'
      });
    }

    return dispatch({
      type: 'RES_DOCUMENT',
      id,
      data: res.Item.data.S
    });
  });
}
