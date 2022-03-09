import { DynamoDB } from 'aws-sdk';
import { getCurrentInvoke } from '@vendia/serverless-express';
import { v4 as uuidv4 } from 'uuid';
import isUUID from 'validator/lib/isUUID';

const dynamodb = new DynamoDB.DocumentClient();

let tableName = 'submissionsTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const UNAUTH = 'UNAUTH';

const currentInvoke = getCurrentInvoke();

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