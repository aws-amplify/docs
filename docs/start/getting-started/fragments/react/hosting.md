Congratulations! You've successfully built your first app with Amplify! Now that you've built something, it's time to deploy it to the web with Amplify Console!

## Add the project to a Git Repository

In order to take advantage of Amplify Console's CI/CD capabilities, it's best to put our project into a Git repository and connect that to Amplify Console. This enables a lot more functionality than just uploading files for deployment (which is also an option).

## Deploy to Amplify Console

The Amplify Console provides a Git-based workflow for hosting fullstack serverless web apps with continuous deployment. A fullstack serverless app consists of a backend built with cloud resources such as GraphQL or REST APIs, file and data storage, and a frontend built with single page application frameworks such as React, Angular, Vue, or Gatsby.

From the root of your project run the following command:

```
amplify add hosting
> Hosting with Amplify Console

> Continuous deployment
Manual deployment
```

Choosing __Continuous deployment__ will open Amplify Console so you can connect your app. Choose the source control provider and repository you want to connect, once you have selected the repository and main branch, click `Next`.

In the next step choose `dev` for the Amplify backend to deploy and choose a role so Amplify Console can deploy the backend as well as your app.

> If you have no roles, click the create role button and you'll be walked through creating a role for Amplify Console to deploy services on your behalf.

![select environment and role](/assets/create-role.jpg)

Leave the rest of the build settings as is and click `Next` again. Finally, click `Save and Deploy`. Once your app builds, you should see something like this:

![select environment and role](/assets/amplify-console-project-example.png)
