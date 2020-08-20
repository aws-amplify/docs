---
title: Connecting a REST API to a Lambda function
description: How to connect a REST API to a Lambda function
---

In this guide you will learn how to connect a REST API to an existing Lambda function.

To get started, create a new API:

```sh
amplify add api

? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: myapi
? Provide a path (e.g., /book/{isbn}): /hello
? Choose a Lambda source: Use a Lambda function already added in the current Amplify project
? Choose the Lambda function to invoke by this path: <your-function-name>
? Restrict API access: N
? Do you want to add another path: N
```

Deploy the API:

```sh
amplify push
```

Your API is now ready to use!

To learn more about how to interact with the API from a client-side application, check out the docs [here](~/lib/restapi/getting-started.md)