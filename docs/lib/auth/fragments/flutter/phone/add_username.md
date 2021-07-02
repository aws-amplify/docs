By default, this will leave email verfication enabled. If you would also like to use phone numbers for verifying users' accounts, follow the steps for **As a verification method** and choose `Phone Number` for the sign-in method when prompted.

```bash
$ amplify add auth

? Do you want to use the default authentication and security configuration? 
# Default configuration
Warning: you will not be able to edit these selections. 
? How do you want users to be able to sign in?
# Phone Number
? Do you want to configure advanced settings?
# No, I am done.

Successfully added auth resource phoneotp0c4b34fd locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```