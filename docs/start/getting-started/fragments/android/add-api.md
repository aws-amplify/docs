## Deploy your Amplify sandbox backend

### Log in or create a new AWS account

If you don’t have an AWS account, you will need to create one first:
1. Select **Create an AWS account**
2. Once you have an account, select **Login to deploy to AWS**
3. When logged in, you will be taken to the Amplify Console

### Create app backend
On the creation form:
<!-- // spell-checker: disable-next-line -->
1. Give your app a name. We went with **amplifiedtodo**
2. Select your preferred deployment region
3. Click **Confirm deployment**

    ![Create app backend](~/images/lib/getting-started/android/connect-to-cloud-create-app-backend.png)

4. The on screen text should walk you through the deployment progress and, when the deployment status reads reaches **Deployment completed**, click **Open admin UI**.

    ![Open admin UI](~/images/lib/getting-started/android/connect-to-cloud-open-admin-ui.png)

1. Run the task. You can do this by pressing the **play button** or pressing **Control-R**.

### Update local project with deployed environment

1. After deployment of authentication, click on **Local setup instructions** at the top of the Admin UI
2. Copy the command for pulling the updated environment and run it in your local project
3. Answer on screen prompts to update your local project with the deployed environment

    ```
    amplify pull --appId <appId> —envName staging

    ? Choose your default editor:
        `<your editor of choice>`
    ? Choose the type of app that you're building
        `android`
    ? Where do you want to store your configuration file?
        `(app/src/main/res)`
    ? Do you plan on modifying this backend?
        `Yes`
    ```

## Verifying cloud sync

### Inspect data

From the Amplify Admin UI, select **Content** from the sidebar. If you have added todos from your app, you should see them show up as part of the results!

![Content](~/images/lib/getting-started/android/add-api-verify-sync-sidebar.png)

![Inspect items](~/images/lib/getting-started/android/add-api-verify-sync-inspect-items.png)

### Create data

Synchronization is bi-directional. Try creating a Todo entry from the Content screen in the Admin UI:
1. Click **Create todo**
2. Fill in the form
  - **name**: This was created remotely!
  - **Priority**: Normal
  - **completedAt**: (Can leave optional field blank!)
3. Click **Save Todo** on the form to save the new entry

You should see your app update with a newly created todo in real-time!