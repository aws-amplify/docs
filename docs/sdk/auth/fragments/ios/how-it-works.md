The `AWSMobileClient` provides APIs and building blocks for developers who want to create user authentication experiences. This includes: 
- Declarative methods for performing authentication actions
- A "Drop-in" UI for performing common tasks
- Automatic token and credential management
- State tracking with notifications for performing authentication workflows.

**Amazon Cognito**

[Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) is a full-featured user directory service to handle user registration, storage, authentication, and account recovery. Cognito User Pools returns JWT tokens to your app but does not provide temporary AWS credentials for calling authorized AWS Services.

[Amazon Cognito Federated Identities](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) is a way to authorize use of AWS services in your app. With a federated identity pool, you can obtain temporary AWS credentials with permissions you define (via IAM Policy) to access AWS services directly, or to access resources through Amazon API Gateway.

When working together, Cognito User Pools acts as an Identity Provider (IDP) for Cognito Federated Identities (analogous to Facebook, Google etc.). AWS Amplify uses Cognito User Pools to store user information and Federated Identities to handle authorization. Amplify leverages Federated Identities to manage user access to AWS, for example allowing a user to upload a file to an S3 bucket.

> **Prerequisite:** [Install and configure the Amplify CLI](~/cli/start/install.md)

## How it works

The AWSMobileClient manages your application session for authentication related tasks. The credentials it pulls in can be used by other AWS services when you call a `.default()` constructor. The Amplify category examples in this documentation use this by default, however [you can also use this with any AWS service via the generated SDK clients](~/sdk/configuration/setup-options.md#direct-aws-service-access).

### State tracking

AWSMobileClient offers on-demand querying of the authentication state of a user. For instance, you can check if the user is signed-in or not and present an appropriate screen. This is done via the following properties of an initialized `AWSMobileClient`:

- `.isLoggedIn` property defined as a BOOLEAN for the most simple use cases
- `.currentUserState` used for more advanced scenarios, such as determining if the user has Guest credentials, Authenticated with User Pools, has Federated credentials, or has signed out.

This allows you to manage workflows in your application based on the state of the user. The `AWSMobileClient` also offers notifications for user state changes. You can register for these in your application using `.addUserStateListener`.

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

### Token Fetch and Refresh

#### Cognito User Pools Tokens
AWSMobileClient will return valid JWT tokens from the cache immediately if they have not expired. If they have expired, it will look for a **Refresh** token in the cache. If it is available, and not expired, the token will be used to fetch valid **IdToken** and **AccessTokens** and store them in the cache.

If the refresh tokens have expired and you try to make a call to an AWS resource, such as an AppSync GraphQL request or S3 upload, AWSMobileClient will dispatch a state notification that authentication is required. At this point you can choose to present the user with a login screen, by calling `AWSMobileClient.default().signIn()`, or perform custom business logic. For example:

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

You can register to listen for state changes anywhere in your application with `.addUserStateListener`. If you want to cancel the re-authentication process, for instance if your application is shared among multiple users of the device, or a user clicks "cancel" on the re-login attempt, you can call `releaseSignInWait()` to terminate the call,then call `signOut()`.

#### AWS Credentials

AWS credentials are used for signing requests to services that use AWS IAM, and for mobile clients they are provided by Amazon Cognito Federated Identity Pools. Similar to JWT tokens, AWSMobileClient will return valid AWS credentials from the cache immediately if they have not expired. If they are expired, and the session is authenticated, the credentials will be refreshed using the refresh token. For unauthenticated sessions, the temporary guest credentials will be automatically refreshed in the background. 

### Offline Support

AWSMobileClient is optimized to account for applications transitioning from offline to online connectivity. It will refresh credentials at the appropriate time so that errors do not occur when offline. In no cases will AWSMobileClient automatically sign out a user if connectivity is not available. You must always make an explicit `signOut()` call for a user to be signed out of a session. 

> **Note**: Credentials are stored in the Xcode keychain. This is an encrypted container. This also means that even after an uninstall/re-install of the app, if a session is authenticated and credentials are present in the keychain, the user will then be automatically logged in (if they have not signed out).

In most cases if you are offline and make a service request, and your tokens are valid, AWSMobileClient will pass the request directly to the service client. Therefore it is your responsibility to check network connectivity. In contrast, the AWS AppSync client supports offline operations and requests will be enqueued and automatically sent when connectivity is restored. [See the API guide for more information on AppSync](~/sdk/api/graphql.md).

If you are offline and make a service request, and your tokens are **NOT** valid, the service request will be blocked and notifications for `signedOutUserPoolsTokenInvalid` or `signedOutFederatedTokensInvalid` will be sent. In the case of the AppSync client this can be ignored and the queries will come from cache or mutations enqueued. For all other services, if this happens and you are offline you should not make the service request until you come back online, at which point AWSMobileClient will automatically re-enter the token refresh flow outlined above, and make the service call with the refreshed credentials.
