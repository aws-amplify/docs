Existing Amazon API Gateway resources can be used with the Amplify Libraries by referencing your API Gateway **endpoint** and configuring authorization in your `amplifyconfiguration.json` file.

```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "[API NAME]": {
                    "endpointType": "REST",
                    "endpoint": "[API GATEWAY ENDPOINT]",
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
  - **endpoint**: The HTTPS endpoint of the API (e.g. *https://aaaaaaaaaa.execute-api.us-east-1.amazonaws.com/api*)
  - **region**:  AWS Region where the resources are provisioned (e.g. *us-east-1*)
  - **authorizationType**: Authorization mode for accessing the API. This can be one of: `AMAZON_COGNITO_USER_POOLS` or `API_KEY`. Each mode requires additional configuration parameters. See [Configure authorization modes](~/lib/restapi/authz.md) for  details.

Note that before you can add an AWS resource to your application, the application must have the Amplify libraries installed. If you need to perform this step, see [Install Amplify Libraries](~/lib/project-setup/create-application.md#n2-install-amplify-libraries). 
