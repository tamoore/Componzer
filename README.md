# Componzer
A prototype of how to create a component CMS using AWS Lambda, DynamoDB, Node, React, Redux, Scribe and Sir Trevor

### Overview

A system that facilitates composable (or componzable) units of content for interactive digital storytelling.

## Setup

### Install
`npm install`

### Dev Server
`npm run server`

Open `localhost:8080`

### Scratch

#### index.html

view it via `python -m SimpleHTTPServer` and don't forget the `GET` variable matches the docs `id`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Output</title>
  </head>
  <body>
    <div id="app">
      <h1>DynamoDB Data Retrieval</h1>
      <textarea id="data" style="width: calc(100vw - 40px); height: calc(100vh - 200px); font-size: 12px; padding: 10px; background-color: #eee;"></textarea>
    </div>
  </body>
  <script src="//sdk.amazonaws.com/js/aws-sdk-2.2.17.min.js"></script>
  <script src="app.js"></script>
</html>

```

#### app.js

```
function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
};

var AWSSetup = function(region){
  return function(id){
    AWS.config.region = region; //'us-east-1'
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: id,
    });
    return {
      DynamoDB: new AWS.DynamoDB()
    };
  };
};
var AWS = AWSSetup('us-east-1')
  ('us-east-1:5be8034c-1dd5-4486-baba-04c30e2d6789');

AWS.DynamoDB.getItem({
  TableName: 'componer',
  Key: {
    id: {
      S: getQueryVariable('id')
    }
  }},
  function(err, res) {
    if(res.Item){
      console.log(res.Item);
      document.getElementById('data').innerHTML =
        JSON.stringify(JSON.parse(res.Item.data.S).data, undefined, 4);
    }
  }
);

```

