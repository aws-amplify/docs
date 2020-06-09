---
title: NodeJS API
description: How to enable a custom domain name using Amplify Hosting
---

In this guide, you will learn how to deploy a Node.js API.

## 1. Initialize a new Amplify project

```sh
amplify init

# Follow the steps to give the project a name, environment name, and set the default text editor.
# Accept defaults for everything else and choose your AWS Profile.
```

## 2. Add the API and function

```sh
amplify add api

? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: nodeapi
? Provide a path (e.g., /book/{isbn}): /hello
? Choose a Lambda source: Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: greetingfunction
? Provide the AWS Lambda function name: greetingfunction
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? N
? Do you want to invoke this function on a recurring schedule? N
? Do you want to edit the local lambda function now? N
? Restrict API access: N
? Do you want to add another path? N
```

The CLI should have created a new function located at **amplify/backend/function/greetingfunction**.

## 3. Updating the function code

Next, open  **amplify/backend/function/greetingfunction/src/index.js** and update the code to the following:

```js
exports.handler = async (event) => {
  const body = {
      message: "Hello from Lambda"
  }
  const response = {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
  };
  return response;
};
```

## 4. Deploy the API

To deploy the API, run the `push` command:

```sh
amplify push
```

## 5. Using the API

Here is how you can send a GET request to the API.

<amplify-block-switcher>
<amplify-block name="JavaScript">

```js
import { API } from 'aws-amplify';

const response = await API.get('nodeapi', '/hello');
```

</amplify-block>
<amplify-block name="iOS">

```swift
func getGreeting() {
    let request = RESTRequest(path: "/hello", body: nil)
    _ = Amplify.API.get(request: request) { result in
        switch result {
        case .success(let data):
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        case .failure(let apiError):
            print("Failed", apiError)
        }
    }
}
```

</amplify-block>
<amplify-block name="Android">

```kotlin
void getTodo() {
    RestOptions options = new RestOptions("/hello");

    Amplify.API.get(options,
            restResponse -> Log.i("Success", restResponse.toString()),
            apiFailure -> Log.e("Failed", apiFailure.getMessage(), apiFailure)
    );
}
```
</amplify-block>
</amplify-block-switcher>

The API endpoint is located in the `aws-exports.js` folder.

You can also interact directly with the API using this URL and the specified path:

```sh
curl https://api-url.execute-api.api-region.amazonaws.com/dev/hello
```
