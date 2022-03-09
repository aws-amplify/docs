import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import express from 'express';
import {postCallback} from './controllers/SubmissionsController'

AWS.config.update({ region: process.env.TABLE_REGION });

const path = '/submissions';
const partitionKeyName: string = 'page_path';
const sortKeyName: string = 'created';
const hasSortKey = sortKeyName !== '';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();
app.use(bodyParser.json());

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
