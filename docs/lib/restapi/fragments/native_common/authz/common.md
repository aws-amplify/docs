

When determining the authorization mode for your REST endpoint, there are a few built in options and customizations you can do.

## IAM Authorization

By default, the API will be using IAM authorization and the requests will be signed for you automatically. IAM authorization has two modes of authorization, an unauthenticated role and an authenticated role. When the user has not signed in through Amplify.Auth.signIn then the assumed role will be unauth. Once the user has signed in, then the role with be auth.

When creating the REST API, you assigned the permissions for these roles when you were asked if you wanted to restrict access. If no, then unauth role will have access to the API. If yes, you would have configured more fine grain access to your API.

### Unauthenticated Requests

You can use the API category to access API Gateway endpoints that don't require authentication. In this case, you need to allow unauthenticated identities in your Amazon Cognito Identity Pool settings. For more information, please visit [Amazon Cognito Developer Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html#enable-or-disable-unauthenticated-identities).

Your requests will be automatically have the IAM credentials when your API is set up to use IAM as the authorization mode. For example, you can check this by looking at what authorization type is configured for the API

```json
{
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME>": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "IAM"
        }
    }
}
```

## API Key

If you want to configure the REST API to be a public API, you can set an API key on the API Gateway and update your configuration to use the API key. You should have the following configuration in your `amplifyconfiguration.json` file containing the `API_KEY` authorization mode and the value of the API key to be used when creating requests.

```json
{
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME>": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_KEY",
            "API_KEY": "[API_KEY]"
        }
    }
}
```


## Cognito User pool authorization

If you set up the API Gateway with a custom authorization with a Cognito User pool, then you can set the `amplifyconfiguration.json` to use `COGNITO_USER_POOL`. 

```json
{
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME>": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "COGNITO_USER_POOL"
        }
    }
}
```

Also in `amplifyconfiguration.json` file, under `awsCognitoAuthPlugin` will contain the corresponding Cognito configuration values that refer to the Cognito User Pool you want to use.
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

This will automatically add the Authorization header with access token to your requests to this API. To see more details on how to configure the API Gateway with the custom authorization, see [this](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html)


## Custom Interceptor

If you have a custom token from another provider, you can set it `custom` and create your own interceptor

```
CUSTOM INTERCEPTOR CODE
```

## Note related to use Access Token or ID Token

The ID Token contains claims about the identity of the authenticated user such as name, email, and phone_number. It could have custom claims as well, for example using [Amplify CLI](https://docs.amplify.aws/cli/usage/lambda-triggers#override-id-token-claims). On the Amplify Authentication category you can retrieve the Id Token using: 

```javascript
(await Auth.currentSession()).getIdToken().getJwtToken();
``` 

The Access Token contains scopes and groups and is used to grant access to authorized resources. [This is a tutorial for enabling custom scopes.](https://aws.amazon.com/premiumsupport/knowledge-center/cognito-custom-scopes-api-gateway/). You can retrieve the Access Token using 

```javascript
(await Auth.currentSession()).getAccessToken().getJwtToken();
```

## Customizing HTTP request headers

To use custom headers on your HTTP request, you need to add these to Amazon API Gateway first. For more info about configuring headers, please visit [Amazon API Gateway Developer Guide](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

If you have used Amplify CLI to create your API, you can enable custom headers by following above steps:  

1. Visit [Amazon API Gateway console](https://aws.amazon.com/api-gateway/).
3. On Amazon API Gateway console, click on the path you want to configure (e.g. /{proxy+})
4. Then click the *Actions* dropdown menu and select **Enable CORS**
5. Add your custom header (e.g. my-custom-header) on the text field Access-Control-Allow-Headers, separated by commas, like: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,my-custom-header'.
6. Click on 'Enable CORS and replace existing CORS headers' and confirm.
7. Finally, similar to step 3, click the Actions drop-down menu and then select **Deploy API**. Select **Development** on deployment stage and then **Deploy**. (Deployment could take a couple of minutes).