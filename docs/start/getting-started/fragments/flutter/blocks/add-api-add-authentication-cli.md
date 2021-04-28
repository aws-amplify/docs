```
amplify add auth

? Do you want to use the default authentication and security configuration?
    `Default configuration`
? How do you want users to be able to sign in?
    `Username`
? Do you want to configure advanced settings?
    `No, I am done.`
```

After adding auth, we are ready to push our backend and provision our outstanding Amplify resources.

```bash
amplify push
```

You should see the Api and Auth Amplify categories (or just Auth if you deployed via admin UI) ready to be created. When prompted with **Are you sure you want to continue?**, select **Yes** and Amplify will provision the necessary cloud resources.
