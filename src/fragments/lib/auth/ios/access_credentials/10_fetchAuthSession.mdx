However, if you need to access them in relation to working with an API outside Amplify or want access to AWS specific identifying information (e.g. IdentityId),
you can access these implementation details by casting the result of fetchAuthSession as follows:  

```swift
import AWSPluginsCore

Amplify.Auth.fetchAuthSession { result in
    do {
        let session = try result.get()

        // Get user sub or identity id
        if let identityProvider = session as? AuthCognitoIdentityProvider {
            let usersub = try identityProvider.getUserSub().get()
            let identityId = try identityProvider.getIdentityId().get()
            print("User sub - \(usersub) and identity id \(identityId)")
        }

        // Get aws credentials
        if let awsCredentialsProvider = session as? AuthAWSCredentialsProvider {
            let credentials = try awsCredentialsProvider.getAWSCredentials().get()
            print("Access key - \(credentials.accessKey) ")
        }

        // Get cognito user pool token
        if let cognitoTokenProvider = session as? AuthCognitoTokensProvider {
            let tokens = try cognitoTokenProvider.getCognitoTokens().get()
            print("Id token - \(tokens.idToken) ")
        }

    } catch {
        print("Fetch auth session failed with error - \(error)")
    }
}
```
