Turning MFA "ON" will make it required for all users, while "Optional" will make it available to enable on a per-user basis.

```bash
$ amplify add auth
 
? Do you want to use the default authentication and security configuration?
# Manual configuration

... Answer as appropriate

? Multifactor authentication (MFA) user login options:
# ON (Required for all logins, can not be enabled later)
? For user login, select the MFA types:
# SMS Text Message
? Please specify an SMS authentication message:
# Your authentication code is {####}

... Answer as appropriate

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```