### Setup AWS Cloud Resources with Amplify CLI 

We will now use the Amplify CLI to configure the AWS Cloud Resources that will power your app. 

1. Configure Amplify to manage cloud resources on your behalf. This step will configure a new AWS user in your account for Amplify. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio. In the terminal, run:

    ```bash
    amplify configure
    ```

    This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step-by-step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

2. Add Analytics by typing in the following in terminal: 

    ```
    amplify add analytics
    ```

    You can just accept all of the default values: 

    ```
    ? Select an Analytics provider (Use arrow keys)
        `Amazon Pinpoint`
    ? Provide your pinpoint resource name: 
        `yourPinpointResourceName`
    ? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting started) 
        `Yes`
    ```

3. To save all your changes and to create your AWS resources, run the following command last:

    ``` 
    amplify push 
    ```

    After these steps, you should notice a `amplifyconfiguration.dart` file within your lib directory of your project.  Guard this file carefully!  It contains sensitive information that your app will use to establish a secure communication with your backend AWS resources.  If it is lost or corrupted, you can always regenerate it by repeating the above steps again with the Amplify CLI. 

At this point you are ready to run your app.  Go back to Android Studio and at the top bar click on the green play button to deploy.