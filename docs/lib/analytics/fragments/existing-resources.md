Existing Amazon Pinpoint resources can be used with the Amplify Libraries by referencing your **Application ID** and **Region** in your `amplifyconfiguration.json` file.

```json
{
    "analytics": {
        "plugins": {
            "awsPinpointAnalyticsPlugin": {
                "pinpointAnalytics": {
                    "appId": "[APP ID]",
                    "region": "[REGION]"
                }
            }
        }
    }
}
```

- **pinpointAnalytics**
  - **appId**: Amazon Pinpoint application ID
  - **region**: AWS Region where the resources are provisioned (e.g. `us-east-1`)