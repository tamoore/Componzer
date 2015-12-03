export const AWSSetup = region => id => secret =>{
  AWS.config.region = region; //'us-east-1'
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: id, //'AKIAITOVUAFQCD6FXLZQ'
    secretAccessKey: secret }); //'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'
  return {
    DynamoDB: new AWS.DynamoDB(),
    Lambda: new AWS.Lambda()
  }
};
