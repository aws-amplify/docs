## Connect existing AWS resources

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `amplifyconfiguration.json` file in your code.

```json
{
  "UserAgent": "aws-amplify-cli/2.0",
  "Version": "1.0",
  "storage": {
    "plugins": {
      "awsS3StoragePlugin": {
         "bucket": "my-s3-bucket",
         "region": "us-west-2",
         "defaultAccessLevel": "guest"
      }
    }
  },
  "analytics": {
    "plugins": {
      "awsPinpointAnalyticsPlugin": {
        "pinpointAnalytics": {
          "appId": "xxxx123xxxx23423bf24234",
          "region": "us-east-1"
        },
        "pinpointTargeting": {
           "region": "us-east-1",
        }
      }
    }
  },
  "api": {
    "plugins": {
      "awsAPIPlugin": {
        "uniqueApiname123": {
          "endpoint": "http://api-gw-endpoint-1",
          "region": "us-east-1"
          "authorizationType": "AWS_IAM",
          "endpointType": "REST"
        },
        "graphqlEndpoint123UserPools": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AMAZON_COGNITO_USER_POOLS",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint234APIKEy": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "API_KEY",
          "apiKey": "apikey12sudksjdfnskjd",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint345IAM": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AWS_IAM",
          "endpointType": "GraphQL"
        }

      }
    }
  },
"predictions":{
  "plugins": {
     "awsPredictionsPlugin": {
        "identify": {
           "collectionId": "TestCollection",
           "region": "us-east-1",
           "maxEntities": 50
         },
        "convert": {
           "voiceId": "Ivy",
           "region": "us-east-1"
        }
      }
    }
  }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.