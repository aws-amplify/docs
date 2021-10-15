---
title: Admin actions
description: Learn how to expose Administrative actions for your Cognito User Pool to your end user applications.
---

Admin Actions allow you to execute queries and operations against users and groups in your Cognito user pool.

For example, the ability to list all users in a Cognito User Pool may provide useful for the administrative panel of an app if the logged-in user is a member of a specific Group called "Admins".

> This is an advanced feature that is not recommended without an understanding of the underlying architecture. The associated infrastructure which is created is a base designed for you to customize for your specific business needs. We recommend removing any functionality which your app does not require.

The Amplify CLI can setup a REST endpoint with secure access to a Lambda function running with limited permissions to the User Pool if you wish to have these capabilities in your application, and you can choose to expose the actions to all users with a valid account or restrict to a specific User Pool Group.

## Enable Admin Queries

```bash
amplify add auth
```

```console
? Do you want to add an admin queries API? Yes
? Do you want to restrict access to a specific Group Yes
? Select the group to restrict access with: (Use arrow keys)
❯ Admins 
  Editors 
  Enter a custom group 
```

This will configure an API Gateway endpoint with a Cognito Authorizer that accepts an Access Token, which is used by a Lambda function to perform actions against the User Pool. The function is example code which you can use to remove, add, or alter functionality based on your business case by editing it in the `amplify/backend/function/AdminQueriesXXX/src` directory and running an `amplify push` to deploy your changes. If you choose to restrict actions to a specific Group, custom middleware in the function will prevent any actions unless the user is a member of that Group.

## Admin Queries API

The default routes and their functions, HTTP methods, and expected parameters are below

- `addUserToGroup`: Adds a user to a specific Group. Expects `username` and `groupname` in the POST body.
- `removeUserFromGroup`: Removes a user from a specific Group. Expects `username` and `groupname` in the POST body.
- `confirmUserSignUp`: Confirms a users signup. Expects `username` in the POST body.
- `disableUser`: Disables a user. Expects `username` in the POST body.
- `enableUser`: Enables a user. Expects `username` in the POST body.
- `getUser`: Gets specific user details. Expects `username` as a GET query string.
- `listUsers`: Lists all users in the current Cognito User Pool. You can provide an OPTIONAL `limit` (between 0 and 60) as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `listGroups`: Lists all groups in the current Cognito User Pool. You can provide an OPTIONAL `limit` (between 0 and 60) as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `listGroupsForUser`: Lists groups to which current user belongs to. Expects `username` as a GET query string. You can provide an OPTIONAL `limit` (between 0 and 60) as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `listUsersInGroup`: Lists users that belong to a specific group. Expects `groupname` as a GET query string. You can provide an OPTIONAL `limit` (between 0 and 60) as a GET query string, which returns a `NextToken` that can be provided as a `token` query string for pagination.
- `signUserOut`: Signs a user out from User Pools, but only if the call is originating from that user. Expects `username` in the POST body.

## Example

To leverage this functionality in your app you would call the appropriate route from `Amplify.API` after signing in. The following example adds the user "richard" to the Editors Group and then list all members of the Editors Group with a pagination limit of 10:

<amplify-block-switcher>

<amplify-block name="JS (React)">

```js
import React from 'react'
import Amplify, { Auth, API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

async function addToGroup() { 
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';
  let myInit = {
      body: {
        "username" : "richard",
        "groupname": "Editors"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      } 
  }
  return await API.post(apiName, path, myInit);
}


let nextToken;

async function listEditors(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsersInGroup';
  let myInit = { 
      queryStringParameters: {
        "groupname": "Editors",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

function App() {
  return (
    <div className="App">
      <button onClick={addToGroup}>Add to Group</button>
      <button onClick={() => listEditors(10)}>List Editors</button>
    </div>
  );
}

export default withAuthenticator(App, true);
```

</amplify-block>

<amplify-block name="iOS">

1. Initialize Amplify API. Refer to [Getting Started with Amplify.API for REST](~/lib/restapi/getting-started.md) for more details. 

You should have the initialization code including the imports:

```swift
import Amplify
// If you are using Swift Package Manager
import AWSAPIPlugin
// or if you are using Cocoapods
import AmplifyPlugins
```

and code that adds `AWSCognitoAuthPlugin`, `AWSAPIPlugin`, and configures it.

```swift
try Amplify.add(plugin: AWSCognitoAuthPlugin())
try Amplify.add(plugin: AWSAPIPlugin())
try Amplify.configure()
```

2. Sign in using `Amplify.Auth`. See [Amplify.Auth](~/lib/auth/getting-started.md) to learn more about signing up and signing in a user.

3. Use the following in your app to add a user to the Group.

```swift
func addToGroup(username: String, groupName: String) {
    let path = "/addUserToGroup"
    let body = "{\"username\":\"\(username)\",\"groupname\":\"\(groupName)\"}".data(using: .utf8)
    let request = RESTRequest(path: path, body: body)
    Amplify.API.post(request: request) { result in
        switch result {
        case .success(let data):
            print("Response Body: \(String(decoding: data, as: UTF8.self))")
        case .failure(let error):
            if case let .httpStatusError(statusCode, response) = error,
                let awsResponse = response as? AWSHTTPURLResponse,
                let responseBody = awsResponse.body
            {
                print("StatusCode: \(statusCode) Response Body: \(String(decoding: responseBody, as: UTF8.self))")
            }
        }
    }
}

addToGroup(username: "richard", groupName:  "Editors")
```

4. Use the following to list the users in the Group.

```swift
func listEditors(groupName: String, limit: Int, nextToken: String? = nil) {
    let path = "/listUsersInGroup"
    var query = ["groupname": groupName,
                  "limit": String(limit)]
    if let nextToken = nextToken {
        query["token"] = nextToken
    }
    
    let request = RESTRequest(path: path, queryParameters: query, body: nil)
    Amplify.API.get(request: request) { result in
        switch result {
        case .success(let data):
            print("Response Body: \(String(decoding: data, as: UTF8.self))")
        case .failure(let error):
            if case let .httpStatusError(statusCode, response) = error,
                let awsResponse = response as? AWSHTTPURLResponse,
                let responseBody = awsResponse.body
            {
                print("StatusCode: \(statusCode) Response Body: \(String(decoding: responseBody, as: UTF8.self))")
            }
        }
    }
}

listEditors(groupName: "Editors", limit: 10)
```

**Note: Cognito User Pool with HostedUI** 

The Admin Queries API configuration in **amplifyconfiguration.json** will have the endpoint's authorization type set to `AMAZON_COGNITO_USER_POOLS`. With this authorization type, `Amplify.API` will perform the request with the access token. However, when using HostedUI, the app may get unauthorized responses despite being signed in, and will require using the ID Token. Set the authorizationType to "NONE" and add a custom interceptor to return the ID Token. 

```json
{
    "awsAPIPlugin": {
        "[YOUR-RESTENDPOINT-NAME]": {
            "endpointType": "REST",
            "endpoint": "[YOUR-REST-ENDPOINT]",
            "region": "[REGION]",
            "authorizationType": "NONE"
        }
    }
}
```
<amplify-callout warning>

If you perform additional updates to your resources using Amplify CLI, the authorizationType will be reverted back to `AMAZON_COGNITO_USER_POOLS`. Make sure to update this back to `NONE`.

</amplify-callout>

Add a custom interceptor to the API
```swift
try Amplify.configure()
try Amplify.API.add(interceptor: MyCustomInterceptor(), for: "[YOUR-RESTENDPOINT-NAME]")
```

Set up the custom interceptor to return the ID token for the request.

```swift
// `URLRequestInterceptor` comes from AWSAPIPlugin, add the following imports
import Amplify
// If you are using Swift Package Manager
import AWSAPIPlugin
// or if you are using Cocoapods
import AmplifyPlugins

class MyCustomInterceptor: URLRequestInterceptor {
    func getLatestAuthToken() -> Result<String, Error> {
        let semaphore = DispatchSemaphore(value: 0)
        var result: Result<String, Error> = .failure(AuthError.unknown("Could not retrieve Cognito token"))
        Amplify.Auth.fetchAuthSession { (event) in
            do {
                defer {
                    semaphore.signal()
                }
                let session = try event.get()
                if let tokens = try (session as? AuthCognitoTokensProvider)?.getCognitoTokens().get() {
                    result = .success(tokens.idToken)
                }
            } catch {
                result = .failure(error)
            }
        }
        semaphore.wait()
        return result
    }
    
    func intercept(_ request: URLRequest) throws -> URLRequest {
        guard let mutableRequest = (request as NSURLRequest).mutableCopy() as? NSMutableURLRequest else {
            throw APIError.unknown("Could not get mutable request", "")
        }
        
        let tokenResult = getLatestAuthToken()
        switch tokenResult {
        case .success(let token):
            mutableRequest.setValue(token, forHTTPHeaderField: "authorization")
        case .failure(let error):
            throw APIError.operationError("Failed to retrieve Cognito UserPool token.", "", error)
        }
        return mutableRequest as URLRequest
    }
}
```

</amplify-block-switcher>