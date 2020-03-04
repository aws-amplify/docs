a. Run `amplify configure` in Terminal from the root of your application folder to set up Amplify with your AWS account.

    - Your default browser will open a tab prompting you to sign in / create a new AWS account
    - Once done, return to the terminal and press Enter
    - Choose a region
    - Choose a username (can use default)
    - Your default browser will open a tab prompting you to walkthrough the process of creating an IAM user. At the end of the process. Save the Access ID and Secret key and return to the terminal.
    - Press Enter
    - It will then ask you to enter the access key ID from the finish page of the browser. Make sure to backspace the default and copy-paste the key for the IAM user you just created.
    - Do the same for <YOUR SECRET ACCESS KEY> in the next step
    - Hit Enter to go with default as the profile name

b. Click the Gradle Task dropdown in your Android Studio toolbar, select **amplifyPush**, and run the task.

Once this is successful, you will see three generated files:

* **amplifyconfiguration.json** and **awsconfiguration.json** under `src/main/res/raw`

Rather than configuring each service through a constructor or constants file, the Amplify Framework for Android supports configuration through centralized files called amplifyconfiguration.json and awsconfiguration.json which define all the regions and service endpoints to communicate. On Android projects these two files will be placed into the root directory.

You can also manually update them if you have existing AWS resources which you manage outside of the Amplify deployment process. Additionally, if you ever decide to run Amplify CLI commands from a terminal inside your Android Studio project these configurations will be automatically updated.

* **amplify-gradle-config.json** under the root directory: This file is used to configure modelgen and push to cloud actions.

c. After the deployment has completed you can open the `amplifyconfiguration.json` and you should see the `api` section containing your backend like the following:
```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "amplifyDatasource": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://<YOUR-GRAPHQL-ENDPOINT>.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "<YOUR API KEY>"
                }
            }
        }
    }
}
```
