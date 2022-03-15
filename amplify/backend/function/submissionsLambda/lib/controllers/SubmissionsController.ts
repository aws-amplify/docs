import { DynamoDB } from 'aws-sdk';
import { getCurrentInvoke } from '@vendia/serverless-express';
import { v4 as uuidv4 } from 'uuid';
import isUUID from 'validator/lib/isUUID';
import isURL from 'validator/lib/isURL';

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

  const isUrlOptions = {
    require_protocol: false,
    require_tld: false,
    require_host: false,
    allow_query_components: false,
    validate_length: true
  }

  if (
    typeof req.body.vote === 'boolean' &&
    typeof req.body.page_path === 'string' && isURL(req.body.page_path, isUrlOptions)
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
        res.statusCode = 400;
        const dbError = 'Error saving feedback';
        res.json({ error: dbError });
      } else {
        res.json({
          data: JSON.stringify({id: putItemParams.Item.id})
        });
      }
    });
  } else {
    res.statusCode = 400;
    const invalidBody =
      'Invalid body for creating feedback';
    res.json({ error: invalidBody });
  }
}