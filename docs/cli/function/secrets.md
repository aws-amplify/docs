---
title: Access secret values
description: Configure Lambda functions to securely access secret values
---

Amplify CLI allows you to configure secret values that can be securely accessed from a Lambda function. This allows the Lambda function to access values such as database passwords, API keys and access tokens without worrying about those values being stored in plaintext. Additionally, each Amplify environment can have a different secret value allowing use cases such as having different API keys for a dev and prod environment.

## Configuring secret values
To add a new function with secret values, run `amplify add function`, select `yes` to the advanced settings prompt and select `yes` to the secrets configuration prompt. From there, you can specify the name and value of the secret.

To add secrets to an existing function, run `amplify update function`, and select `Secret values configuration`. You can then add, update and remove secret values.

> Note: Amplify never stores secrets locally. All secret values are immediately stored in [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) using the SecureString parameter type.

## Accessing the values in your function
To access the secret values in your lambda function, use the [AWS SSM GetParameter API](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html). Amplify CLI will automatically supply the SSM parameter name of the secret as an environment variable to the function. This value can be passed into the API call as the "Name" to retrieve the value. Ensure that the API call has "WithDecryption" specified as `true`.

If your lambda function is using the NodeJS runtime, a comment block will be placed at the top of your index.js file with example code to retrieve the secret values.

## Multi-environment flows
When creating a new Amplify environment using `amplify env add`, Amplify CLI will detect if some functions have secrets configured. A prompt will appear asking if you want to apply all secret values to the new environment or make edits. If you choose to apply the existing values, you will still be able to make edits anytime using `amplify update function`.

When creating a new Amplify environment using `amplify env add --yes`, Amplify CLI will apply all secret values from the current environment to the new environment by default.

In multi-environment workflows, you may have added a new secret in one Amplify environment and then checked out a different Amplify environment. In this case, on the next `amplify push`. Amplify CLI will detect that there is a new secret that does not have a value specified in the current environment and prompt for one. Running `amplify push --yes` in this case will fail with a message explaining the missing secret values.