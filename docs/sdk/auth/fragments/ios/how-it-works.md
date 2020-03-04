The `AWSMobileClient` provides client APIs and building blocks for developers who want to create user authentication experiences. This includes declarative methods for performing authentication actions, a simple "drop-in auth" UI for performing common tasks, automatic token and credentials management, and state tracking with notifications for performing workflows in your application when users have authenticated.

**Amazon Cognito**

[Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) is a full-featured user directory service to handle user registration, storage, authentication, and account recovery. Cognito User Pools returns JWT tokens to your app and does not provide temporary AWS credentials for calling authorized AWS Services.
[Amazon Cognito Federated Identities](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) on the other hand, is a way to authorize your users to use AWS services. With an identity pool, you can obtain temporary AWS credentials with permissions you define to access other AWS services directly or to access resources through Amazon API Gateway.

When working together, Cognito User Pools acts as a source of user identities (identity provider) for the Cognito Federated Identities. Other sources can be OpenID, Facebook, Google, etc. AWS Amplify uses User Pools to store your user information and handle authorization, and it leverages Federated Identities to manage user access to AWS Resources, for example allowing a user to upload a file to an S3 bucket.

<b>Prerequisite:</b> [Install and configure the Amplify CLI](..)<br>
<b>Recommendation:</b> [Complete the Getting Started guide](./start)
{: .callout .callout--info}

## How it works

The AWSMobileClient manages your application session for authentication related tasks. The credentials it pulls in can be used by other AWS services when you call a `.default()` constructor. The Amplify category examples in this documentation use this by default, however [you can also use this with any AWS service via the generated SDK clients](manualsetup#direct-aws-service-access).

### State tracking

`AWSMobileClient` offers on-demand querying for the "login state" of a user in the application. For instance, you can check if the user is signed-in or not and present an appropriate screen. This is done through a couple of mechanisms:

- `isLoggedIn` property defined as a BOOLEAN for the most simple use cases
- `currentUserState` used for more advanced scenarios, such as determining if the user has Guest credentials, Authenticated with User Pools, has Federated credentials, or has signed out.

This allows you to write workflows in your application based on the state of the user and what you would like to present on different screens. The `AWSMobileClient` also offers realtime notifications on user state changes which you can register for in your application using `.addUserStateListener` as in the code below.

```swift
AWSMobileClient.default().addUserStateListener(self) { (userState, info) in
            switch (userState) {
            case .guest:
                print("user is in guest mode.")
            case .signedOut:
                print("user signed out")
            case .signedIn:
                print("user is signed in.")
            case .signedOutUserPoolsTokenInvalid:
                print("need to login again.")
            case .signedOutFederatedTokensInvalid:
                print("user logged in via federation, but currently needs new tokens")
            default:
                print("unsupported")
            }
        }
```



### Token fetch and refresh

#### Cognito User Pool tokens
The `AWSMobileClient` will return valid JWT tokens from your cache immediately if they have not expired. If they have expired it will look for a **Refresh** token in the cache. If it is available and not expired it will be used to fetch a valid **IdToken** and **AccessToken** and store them in the cache.

If the Refresh tokens have expired and you then make call to any AWS service, such as a AppSync GraphQL request or S3 upload, the `AWSMobileClient` will dispatch a state notification that a re-login is required. At this point you can choose to present the user with a login screen, call `AWSMobileClient.default().signIn()`, or perform custom business logic. For example:

```swift
AWSMobileClient.default().addUserStateListener(self) { (userState, info) in
            
            switch (userState) {
            case .signedOut:
                // user clicked signout button and signedout
                print("user signed out")
            case .signedOutUserPoolsTokenInvalid:
                print("need to login again.")
                AWSMobileClient.default().signIn(username: "username", password: "password", completionHandler: { (res, err) in
                    //...
                });
                //Alternatively call .showSignIn()
            default:
                print("unsupported")
            }
}
```

You can register to listen for this state change anywhere in your app with `.addUserStateListener`, such as in `viewDidLoad()` in the above example. If you want to cancel the re-login process, for instance if your application is shared among multiple users of the device or a user clicks "cancel" on the re-login attempt, you can call `releaseSignInWait()` to terminate the call and then call a `signOut()`.

#### AWS Credentials

AWS Credentials are used for signing requests to services that use AWS IAM, and for mobile clients they are provided by Amazon Cognito Identity Pools. Similar to JWT tokens, `AWSMobileClient` will return valid AWS Credentials from your cache immediately if they have not expired. If they are expired they will be refreshed using the JWT token that has been federated if the session is authenticated. For Guest scenarios they will be automatically refreshed. 

### Offline support

`AWSMobileClient` is optimized to account for applications transitioning from offline to online connectivity, and refreshing credentials at the appropriate time so that errors do not occur when actions are taken and connectivity is not available. In no cases will the `AWSMobileClient` automatically sign out a user if connectivity is not available. You must always make an explicit `signOut()` call for a user to be signed out of a session. 

In most cases if you are offline and make a service request, and your tokens are valid, the `AWSMobileClient` will pass the request directly to the service client. Therefore it is your responsibility to check network connectivity. In the case of the AWS AppSync client it supports offline operations and the request will be enqueued and automatically sent when connectivity is restored, refreshing credentials if necessary. [See the API guide for more information on AppSync](./api).

If you are offline and make a service request, and your tokens are **NOT** valid, the service request will be blocked and notifications for `signedOutUserPoolsTokenInvalid` or `signedOutFederatedTokensInvalid` will be sent to the listener. In the case of the AppSync client this can be ignored and the queries will come from cache or mutations enqueued with credentials automatically refreshing upon reconnection. For all other services, if this happens and you are offline you should not make the service request until you come back online, at which point the `AWSMobileClient` will automatically re-enter the token refresh flow outlined above and then make the service call with the updated credentials.
