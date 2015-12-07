export const AWSSetup = region => id =>{
  AWS.config.region = region; //'us-east-1'
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: id,
  });
  return {
    DynamoDB: new AWS.DynamoDB(),
    Lambda: new AWS.Lambda()
  }
};
