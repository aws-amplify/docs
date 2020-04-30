---
title: Upgrading the CLI
description: Keep Amplify CLI up-to-date by running npm install -g @aws-amplify/cli
---  

The Amplify CLI team continuously pushes new features, enhancements and security improvements and it is recommended to update the Amplify CLI version which you or your team is using to the latest version. You can keep track of the latest releases of the Amplify CLI on npm - https://www.npmjs.com/package/@aws-amplify/cli

Follow the steps below to update to the latest version of the CLI:

1. Enter the following command in your terminal: 
    ```bash
    npm install -g @aws-amplify/cli
    ```
2. Verify the successful installation of the latest CLI version by entering the following command in the CLI
    ```bash
    amplify -v
    ```
    and confirm the installed version of the Amplify CLI. You can find the latest version of the CLI here - https://www.npmjs.com/package/@aws-amplify/cli
3. Navigate to your Amplify project folder using the following command `cd <Project-Filepath>`. To verify if it is a valid Amplify project folder, enter the following command in the CLI:
    ```bash
    amplify status
    ```
    If it is a valid Amplify project folder, Amplify will display a list of the resources in the project folder that you have deployed to the AWS cloud. 
4. Update your backend resources with updated security configurations or improvements by entering the following command in the CLI:
    ```bash
    amplify push --force
    ```
    Hit Enter or type Y when prompted for confirmations. Look for the following result to validate the configuration updates have been applied.
    ```console
    ✔ All resources are updated in the cloud 
    ```
5. If you have multiple AWS Amplify project folders, repeat steps **#3** and **#4** for each project folder.