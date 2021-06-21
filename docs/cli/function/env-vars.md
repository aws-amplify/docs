---
title: Custom environment variables
description: Configure Lambda runtime environment variables
---

Amplify CLI allows you to create custom Lambda environment variables that will be available to your Lambda during runtime. Each Amplify environment can have a different value for an environment variable allowing use cases such as switching between dev and prod URLs depending on the environment.

> Environment variables should NOT be used for storing sensitive configuration values such as database passwords, API keys or access tokens. To access these types of values from your function, see [function secrets configuration](~/cli/function/secrets.md).

## Configuring environment variables
To add a new function with custom environment variables, run `amplify add function`, select `yes` to the advanced settings prompt and select `yes` to the environment variables configuration prompt. From there, you will be able to specify a key and value for the environment variable.

To add custom environment variables to an existing function, run `amplify update function`, and select `Environment variables configuration`. You can then add, update and remove environment variables.

## Multi-environment flows
When creating a new Amplify environment using `amplify env add`, Amplify CLI will detect if some functions have environment variables. A prompt will appear asking if you want to apply all environment variable values to the new environment or make edits. If you choose to apply the existing values, you will still be able to make edits anytime using `amplify update function`.

When creating a new Amplify environment using `amplify env add --yes`, Amplify CLI will apply all environment variable values from the current environment to the new environment by default.

In multi-environment workflows, you may have added a new environment variable in one Amplify environment and then checked out a different Amplify environment. In this case, on the next `amplify push`, Amplify CLI will detect that there is a new environment variable that does not have a value specified in the current environment and prompt for one.
Running `amplify push --yes` in this case will fail with a message explaining the missing environment variable values.