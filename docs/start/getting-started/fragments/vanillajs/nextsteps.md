- [Authentication](~/lib/auth/getting-started.md)
- [DataStore](~/lib/datastore/getting-started.md)
- [User File Storage](~/lib/storage/getting-started.md)
- [Geo (Developer Preview)](~/lib/geo/getting-started.md)
- [Serverless APIs](~/lib/graphqlapi/getting-started.md)
- [Analytics](~/lib/analytics/getting-started.md)
- [AI/ML](~/lib/predictions/getting-started.md) 
- [Push Notification](~/lib/push-notifications/getting-started.md)
- [PubSub](~/lib/pubsub/getting-started.md)
- [AR/VR](~/lib/xr/getting-started.md)

## Existing AWS Resources

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `awsconfiguration.json` file in your code. For example, if you were using Amazon Cognito Identity, Cognito User Pools, AWS AppSync, or Amazon S3:

```json
{
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
                "Region": "XX-XXXX-X"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "XX-XXXX-X_abcd1234",
            "AppClientId": "XXXXXXXX",
            "Region": "XX-XXXX-X"
        }
    },
    "AppSync": {
        "Default": {
            "ApiUrl": "https://XXXXXX.appsync-api.XX-XXXX-X.amazonaws.com/graphql",
            "Region": "XX-XXXX-X",
            "AuthMode": "AMAZON_COGNITO_USER_POOLS"
        }
    },
    "S3TransferUtility": {
        "Default": {
            "Bucket": "BUCKET_NAME",
            "Region": "XX-XXXX-X"
        }
    }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.

## AWS SDK Interfaces

For working with other AWS services you can use service interface objects directly via the generated SDK clients. 

<amplify-callout>

To work with service interface objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.

</amplify-callout>

You can call methods on any AWS Service interface object supported by the AWS Android SDK by passing your credentials from the AWSMobileClient to the service call constructor. See [SDK Setup Options](~/sdk/configuration/setup-options.md) for more information.
