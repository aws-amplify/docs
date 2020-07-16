By default API Gateway is setup with AWS IAM authorization. To switch to another mode run `amplify console api` and select `REST` to change this in the API Gateway console.

## API Key

To invoke an API Gateway endpoint with API Key as the auth mode, you should have the following configuration in your `amplifyconfiguration.json` file.

```json
{
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME>": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_KEY"
        }
    }
}
```

## Cognito User Pools authorization

To invoke an API Gateway endpoint from your application with Cognito User Pools authorization use the `AWSMobileClient` as outlined in [the authentication section](~/lib/auth/getting-started.md). If you have logged in with the `AWSMobileClient` at the start of your application lifecycle, the Amplify API category will use these credentials automatically for you as long as the configuration set in your `amplifyconfiguration.json` file is set to `"authorizationType": "AMAZON_COGNITO_USER_POOLS"`.

```json
{
    "CognitoUserPool": {
        "Default": {
            "PoolId": "POOL-ID",
            "AppClientId": "APP-CLIENT-ID",
            "AppClientSecret": "APP-CLIENT-SECRET",
            "Region": "us-east-1"
        }
    },
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "YOUR-COGNITO-IDENTITY-POOLID",
                "Region": "us-east-1"
            }
        }
    }
}
```

and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME>": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-east-1",
            "authorizationType": "AMAZON_COGNITO_USER_POOLS"
        }
    }
}
```