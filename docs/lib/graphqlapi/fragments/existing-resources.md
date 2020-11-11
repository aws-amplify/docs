Existing AWS AppSync resources can be used with the Amplify Libraries by referencing your AWS AppSync **endpoint** and configuring authorization  in your `amplifyconfiguration.json` file.

```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "[API NAME]": {
                    "endpointType": "GraphQL",
                    "endpoint": "[APPSYNC ENDPOINT]",
                    "region": "[REGION]",
                    "authorizationType": "[AUTHORIZATION TYPE]",
                    ...
                }
            }
        }
    }
}
```

- **API NAME**: Friendly name for the API (e.g., *api*)
  - **endpoint**: The HTTPS endpoint of the AWS AppSync API (e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*)
  - **region**:  AWS Region where the resources are provisioned (e.g. *us-east-1*)
  - **authorizationType**: Authorization mode for accessing the API. This can be one of: `AMAZON_COGNITO_USER_POOLS`, `AWS_IAM`, `OPENID_CONNECT`, or `API_KEY`. Each mode requires additional configuration parameters. See [Configure authorization modes](~/lib/graphqlapi/authz.md) for  details.

Note that before you can add an AWS resource to your application, the application must have the Amplify libraries installed. If you need to perform this step, see [Install Amplify Libraries](~/lib/project-setup/create-application.md#n2-install-amplify-libraries). 
