### Setup AWS Cloud Resources with Amplify CLI 

We will now use the Amplify CLI to configure the AWS Cloud Resources that will power your app. 

1. First install the amplify cli. Within your terminal run: 

    ```bash
    npm install -g @aws-amplify/cli
    ```

2. Initialize Amplify CLI by running: 

    ```bash
    amplify init
    ```

    Enter the following when prompted:

    ```console
    ? Enter a name for the environment
        `dev`
    ? Choose your default editor:
        `IntelliJ IDEA`
    ? Choose the type of app that you're building: 
        'flutter'
    ⚠️  Flutter project support in the Amplify CLI is in DEVELOPER PREVIEW.
    Only the following categories are supported:
     * Auth
     * Analytics
     * Storage
    ? Where do you want to store your configuration file? 
        ./lib/
    ? Do you want to use an AWS profile?
        `Yes`
    ? Please choose the profile you want to use
        `default`
    ```

3. Configure Amplify to manage cloud resources on your behalf. This step will configure a new AWS user in your account for Amplify. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio. In the terminal, run:

    ```bash
    amplify configure
    ```

    This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step-by-step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

4. Add Analytics by typing in the following in terminal: 

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

5. To save all your changes and to create your AWS resources, run the following command last:

    ``` 
    amplify push 
    ```

    After these steps, you should notice a `amplifyconfiguration.dart` file within your lib directory of your project.  Guard this file carefully!  It contains sensitive information that your app will use to establish a secure communication with your backend AWS resources.  If it is lost or corrupted, you can always regenerate it by repeating the above steps again with the Amplify CLI. 

At this point you are ready to run your app.  Go back to Android Studio and at the top bar click on the green play button to deploy.
