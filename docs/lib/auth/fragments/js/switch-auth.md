
For client side authentication there are three different flows:

1. `USER_SRP_AUTH`: The `USER_SRP_AUTH` flow uses the <a href="https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol" target="_blank">SRP protocol (Secure Remote Password)</a> where the password never leaves the client and is unknown to the server. This is the recommended flow and is used by default.

2. `USER_PASSWORD_AUTH`: The `USER_PASSWORD_AUTH` flow will send user credentials unencrypted to the back-end. If you want to migrate users to Cognito using the "Migration" trigger and avoid forcing users to reset their passwords, you will need to use this authentication type because the Lambda function invoked by the trigger needs to verify the supplied credentials.

3. `CUSTOM_AUTH`: The `CUSTOM_AUTH` flow is used to allow for a series of challenge and response cycles that can be customized to meet different requirements.

To configure `Auth` to use the different flows:

```javascript
Auth.configure({
    // other configurations...
    // ...
    authenticationFlowType: 'USER_SRP_AUTH' | 'USER_PASSWORD_AUTH' | 'CUSTOM_AUTH',
})
```

> For more information about authentication flows, please visit [AWS Cognito developer documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html#amazon-cognito-user-pools-custom-authentication-flow)

## USER_PASSWORD_AUTH flow

A use case for the `USER_PASSWORD_AUTH` authentication flow is migrating users into Amazon Cognito

### Setup auth backend

In order to use the authentication flow `USER_PASSWORD_AUTH`, your Cognito app client has to be configured to allow it. In the AWS Console, this is done by ticking the checkbox at General settings > App clients > Show Details (for the affected client) > Enable username-password (non-SRP) flow. If you're using the AWS CLI or CloudFormation, update your app client by adding `USER_PASSWORD_AUTH` to the list of "Explicit Auth Flows".

### Migrate users with Amazon Cognito

Amazon Cognito provides a trigger to migrate users from your existing user directory seamlessly into Cognito. You achieve this by configuring your User Pool's "Migration" trigger which invokes a Lambda function whenever a user that does not already exist in the user pool authenticates, or resets their password.

In short, the Lambda function will validate the user credentials against your existing user directory and return a response object containing the user attributes and status on success. An error message will be returned if an error occurs. There's a documentation [here](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-import-using-lambda.html) on how to set up this migration flow and more detailed instructions [here](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-migrate-user.html#cognito-user-pools-lambda-trigger-syntax-user-migration) on how the lambda should handle request and response objects.

## CUSTOM_AUTH flow

Amazon Cognito User Pools supports customizing the authentication flow to enable custom challenge types, in addition to a password in order to verify the identity of users. These challenge types may include CAPTCHAs or dynamic challenge questions.

To define your challenges for custom authentication flow, you need to implement three Lambda triggers for Amazon Cognito.

<amplify-callout>

For more information about working with Lambda Triggers for custom authentication challenges, please visit [Amazon Cognito Developer Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-challenge.html).

</amplify-callout>

### Custom authentication flow

To initiate a custom authentication flow in your app, call `signIn` without a password. A custom challenge needs to be answered using the `sendCustomChallengeAnswer` method:

```javascript
import { Auth } from 'aws-amplify';

Auth.configure({
    // other configurations
    // ...
    authenticationFlowType: 'CUSTOM_AUTH'
});

let challengeResponse = "the answer for the challenge";

Auth.signIn(username, password)
    .then(user => {
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
            // to send the answer of the custom challenge
            Auth.sendCustomChallengeAnswer(user, challengeResponse)
                .then(user => console.log(user))
                .catch(err => console.log(err));
        } else {
            console.log(user);
        }
    })
    .catch(err => console.log(err));
```

### CAPTCHA-based authentication

Here is the sample for creating a CAPTCHA challenge with a Lambda Trigger.

The `Create Auth Challenge Lambda Trigger` creates a CAPTCHA as a challenge to the user. The URL for the CAPTCHA image and  the expected answer is added to the private challenge parameters:

```javascript
export const handler = async (event) => {
    if (!event.request.session || event.request.session.length === 0) {
        event.response.publicChallengeParameters = {
            captchaUrl: "url/123.jpg",
        };
        event.response.privateChallengeParameters = {
            answer: "5",
        };
        event.response.challengeMetadata = "CAPTCHA_CHALLENGE";
    }
    return event;
};
```

This `Define Auth Challenge Lambda Trigger` defines a custom challenge:

```javascript
export const handler = async (event) => {
    if (!event.request.session || event.request.session.length === 0) {
        // If we don't have a session or it is empty then send a CUSTOM_CHALLENGE
        event.response.challengeName = "CUSTOM_CHALLENGE";
        event.response.failAuthentication = false;
        event.response.issueTokens = false;
    } else if (event.request.session.length === 1 && event.request.session[0].challengeResult === true) {
        // If we passed the CUSTOM_CHALLENGE then issue token
        event.response.failAuthentication = false;
        event.response.issueTokens = true;
    } else {
        // Something is wrong. Fail authentication
        event.response.failAuthentication = true;
        event.response.issueTokens = false;
    }

    return event;
};
```

The `Verify Auth Challenge Response Lambda Trigger` is used to verify a challenge answer:

```javascript
export const handler = async (event, context) => {
    if (event.request.privateChallengeParameters.answer === event.request.challengeAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }

    return event;
};
```