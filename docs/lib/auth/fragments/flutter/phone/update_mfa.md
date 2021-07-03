As mentioned above, MFA cannot be unconditionally enabled for all users after creating a user pool. The following steps show how to enable MFA as "Optional" for users. In this mode, MFA must be enabled on a user-by-user basis, either through an Admin SDK (e.g. via a Lambda trigger as part of the sign-up process), or manually in the Cognito console.

If you'd like to make MFA required for users, you must first delete your auth resource by running `amplify remove auth`, then follow the **New Project** flow on this page.

```bash
$ amplify update auth

? What do you want to do?
# Walkthrough all the auth configurations

... Answer as appropriate

? Multifactor authentication (MFA) user login options:
# OPTIONAL (Individual users can use MFA)
? For user login, select the MFA types:
# SMS Text Message
? Please specify an SMS authentication message:
# Your authentication code is {####}

... Answer as appropriate

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```