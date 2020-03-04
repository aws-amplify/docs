## Lambda triggers

The Amplify CLI allows you to configure [Lambda Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html) for your AWS Cognito User Pool. These enable you to add custom functionality to your registration and authentication flows. [Read more]({/cli-toolchain/)

Many Cognito Lambda Triggers accept unsanitized key/value pairs in the form of a 'ClientMetadata' attribute.  To configure a static set of key/value pairs, you can define a `clientMetadata` key in the `Auth.configure` function. You can also pass a `clientMetadata` parameter to the various `Auth` functions which result in Cognito Lambda Trigger execution. These functions include:

- `Auth.changePassword`
- `Auth.completeNewPassword`
- `Auth.confirmSignIn`
- `Auth.confirmSignUp`
- `Auth.forgotPasswordSubmit`
- `Auth.resendSignUp`
- `Auth.sendCustomChallengeAnswer`
- `Auth.signIn`
- `Auth.signUp`
- `Auth.updateUserAttributes`
- `Auth.verifyUserAttribute`

Please note that some of triggers which accept a 'validationData' attribute will use clientMetadata as the value for validationData.  Exercise caution with using clientMetadata when you are relying on validationData.

## Subscribing to events with the Hub module

You can take specific actions when users sign-in or sign-out by subscribing authentication events in your app. Please see our [Hub Module Developer Guide]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/hub#listening-authentication-events) for more information.
