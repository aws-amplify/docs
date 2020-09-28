When determining the authorization mode for your REST endpoint, there are a few built in options and customizations you can do.

## IAM Authorization

By default, the API will be using IAM authorization and the requests will be signed for you automatically. IAM authorization has two modes: one using an **unauthenticated** role, and one using an **authenticated** role. When the user has not signed in through `Amplify.Auth.signIn`, the unauthenticated role is used by default. Once the user has signed in, the authenticate role is used, instead.

When you created your REST API with the Amplify CLI, you were asked if you wanted to restrict access. If you selected **no**, then the unauthenticated role will have access to the API. If you selected **yes**, you would have configured more fine grain access to your API.

### Unauthenticated Requests

You can use the API category to access API Gateway endpoints that don't require authentication. In this case, you need to allow unauthenticated identities in your Amazon Cognito Identity Pool settings. For more information, please visit [Amazon Cognito Developer Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html#enable-or-disable-unauthenticated-identities).

When your API is configured to use IAM as the authorization type, your requests will automatically have IAM credentials added to the headers of outgoing requests. You can verify that IAM is being used as the authorization type by inspecting the `authorizationType` associated with your API in `amplifyconfiguration.json`:

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

If you want to configure a public REST API, you can set an API key in Amazon API Gateway. Then, update your `amplifyconfiguration.json` to reference it.  The value associated to the `"authorizationType"` key should be `"API_KEY"`.  Also include a `"API_KEY"` as a key, and set its value to whatever your configured in API Gateway.

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
