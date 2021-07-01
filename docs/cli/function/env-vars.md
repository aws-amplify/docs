---
title: Environment variables
description: Configure environment variables for AWS Lambda functions
---

Amplify CLI allows you to configure environment variables for your Lambda functions. Each Amplify environment can have a different environment variable value. This enables use cases such as switching between dev and prod URLs depending on the environment.

> Environment variables should NOT be used for storing sensitive configuration values such as database passwords, API keys, or access tokens. Use [function secrets configuration](~/cli/function/secrets.md) instead!

## Configuring environment variables
To configure a new function with environment variables, run `amplify add function`, select `yes` to the advanced settings prompt and select `yes` to the environment variables configuration prompt. From there, you will be able to specify a key and value for the environment variable.

```console
$ amplify add function
...
? Do you want to configure advanced settings? Yes
...
? Do you want to configure environment variables for this function? Yes
? Enter the environment variable name: API_URL
? Enter the environment variable value: https://example.com/test
? Select what you want to do with environment variables: (Use arrow keys)
  Add new environment variable
  Update existing environment variables
  Remove existing environment variables
> I'm done
```

To configure environment variables for an existing function, run `amplify update function`, and select `Environment variables configuration`. You can then add, update, or remove environment variables.

```console
$ amplify update function
...
? Which setting do you want to update?
  Resource access permissions
  Scheduled recurring invocation
  Lambda layers configuration
> Environment variables configuration
  Secret values configuration
? Select what you want to do with environment variables:
> Add new environment variable
  Update existing environment variables
  Remove existing environment variables
  I'm done
```

## Multi-environment flows
When creating a new Amplify environment using `amplify env add`, Amplify CLI asks if you want to apply all environment variable values to the new environment or modify them. If you choose to apply the existing values, you can still make edits anytime by running `amplify update function`.

When creating a new Amplify environment using `amplify env add --yes`, Amplify CLI will apply all environment variable values from the current environment to the new environment.

In multi-environment workflows, you may have added a new environment variable in one Amplify environment and then checked out a different Amplify environment. In this case, on the next `amplify push`, Amplify CLI will detect that there is a new environment variable that does not have a value specified in the current environment and prompt for one.
Running `amplify push --yes` in this case will fail with a message explaining the missing environment variable values.
