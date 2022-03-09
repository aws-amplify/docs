import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import express from 'express';
import {postCallback} from './controllers/SubmissionsController'

AWS.config.update({ region: process.env.TABLE_REGION });

const path = '/submissions';

// declare a new express app
const app = express();
app.use(bodyParser.json());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, postCallback);

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export { app };
