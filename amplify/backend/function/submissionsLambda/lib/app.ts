import AWS from 'aws-sdk';
import { getCurrentInvoke } from '@vendia/serverless-express';
import bodyParser from 'body-parser';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import isUUID from 'validator/lib/isUUID';

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = 'submissionsTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName: string = 'page_path';
const sortKeyName: string = 'created';
const hasSortKey = sortKeyName !== '';
const path = '/submissions';
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();
app.use(bodyParser.json());

// removing cause this is deprecated
// app.use(awsServerlessExpressMiddleware.eventContext());
// do this instead: https://github.com/vendia/serverless-express/blob/mainline/UPGRADE.md
const currentInvoke = getCurrentInvoke();

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, function(req, res) {
  // Method not allowed.
  res.statusCode = 405;
  res.json({ error: 'Method is not allowed.' });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + hashKeyPath + sortKeyPath, function(req, res) {
  // Method not allowed.
  res.statusCode = 405;
  res.json({ error: 'Method is not allowed.' });
});

/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function(req, res) {
  // Method not allowed.
  res.statusCode = 405;
  res.json({ error: 'Method is not allowed.' });
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, postCallback);

export function postCallback(req, res) {
  if (userIdPresent) {
    req.body['userId'] =
      currentInvoke.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  const timestamp = new Date().toISOString();

  if (
    typeof req.body.vote === 'boolean' &&
    typeof req.body.page_path === 'string'
  ) {

    let id = uuidv4();
    if (typeof req.body.id === 'string' && isUUID(req.body.id)) {
      id = req.body.id;
    }

    let putItemParams = {
      TableName: tableName,
      Item: {
        id: id,
        created: timestamp,
        vote: req.body.vote,
        page_path: req.body.page_path
      }
    };

    dynamodb.put(putItemParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: err, url: req.url, body: req.body });
      } else {
        res.json({
          success: 'post call succeed!',
          url: req.url,
          data: JSON.stringify(putItemParams.Item)
        });
      }
    });
  } else {
    res.statusCode = 400;
    const invalidBody =
      'Invalid body for creating feedback: "vote" should be a boolean and "page_path" should be a string.';
    res.json({ error: invalidBody, url: req.url, body: req.body });
  }
}

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete(path + hashKeyPath + sortKeyPath, function(req, res) {
  // Method not allowed.
  res.statusCode = 405;
  res.json({ error: 'Method is not allowed.' });
});

app.listen(3000, function() {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
// module.exports = app;
export { app };
