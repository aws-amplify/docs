export const meta = {
  title: `Develop locally with Admin UI file storage`,
  description: `Get started developing with the Admin UI`,
};

To enable local development after setting up guest permissions, you must allow unauthenticated logins by updating your auth settings.

## Allow unauthenticated logins

You must allow unauthenticated access to begin developing locally.

1. Pull your Amplify backend locally by calling
```bash
amplify pull appid --<Your App ID> --envName <Your Env Name>
```
2. Begin the process of updating your auth. Call
```bash
amplify update auth
```
Select Walkthrough all the auth configurations. You will then be asked several questions regarding auth.
3. You can keep all settings the same, except when asked Allow unauthenticated logins?. Select yes to allow unauthenticated logins.

![Amplify CLI update auth settings](/images/console/unauthCLI.png)


4. Once you’ve completed going through the remaining configurations, update your backend by calling
```bash
amplify push
```
You are now ready to start developing locally.