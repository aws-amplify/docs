---
title: Continuous deployment
description: Use the multi-environments feature with the Amplify Console for a fully managed web application hosting and continuous deployment solution.
---

## Using Amplify Console

You can use the multi-environments feature with the Amplify Console for a fully managed web application hosting and continuous deployment solution. For more information please learn more in the [official documentation](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html).

## Using Build Settings

You should make sure that you are using the same Build settings Amplify CLI Version as you are developing with. Lets say that locally you are using `@aws-amplify/cli@4.17.2` but the latest is `@aws-amplify/cli@4.21.4`, this could cause discrepancies between your backend and frontend code that relies on your schema. 

An example of this is when using Angular it creates a file called `API.service.ts` this would be generated when developing and committed to your git repo based on your `4.17.2` which has differences on the schema than what your AppSync (`backend/api/appsyncapi/build`) would be based on, which would cause issues.
