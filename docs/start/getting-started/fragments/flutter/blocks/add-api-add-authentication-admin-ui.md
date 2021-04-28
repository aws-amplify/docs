#### Enable admin UI

If you have already set up the admin UI in a previous step, you can skip ahead to **Deploy authentication** in this section. Otherwise, open the amplify console with the following command. 

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-enable-admin-ui.md"></inline-fragment>

#### Deploy authentication

From the Amplify admin UI:
1. Select **Authentication** from the sidebar
2. Click **Save and deploy** with the default configuration
3. After deployment, click on **Deployment successful - click for next steps** at the top of the admin UI
4. Copy the command for pulling the updated environment and run it in your terminal
5. Answer on screen prompts if asked

```
amplify pull --appId <appId> —envName staging

? Choose your default editor:
    `<your editor of choice>`
? Choose the type of app that you're building
    `flutter`
? Where do you want to store your configuration file?
    `./lib/`
? Do you plan on modifying this backend?
    `Yes`
```
