Amazon Cognito User Pools supports customizing the authentication flow to enable custom challenge types, in addition to a password in order to verify the identity of users. These challenge types may include CAPTCHAs or dynamic challenge questions.

To define your challenges for custom authentication flow, you need to implement three Lambda triggers for Amazon Cognito.

For more information about working with Lambda Triggers for custom authentication challenges, please visit [Amazon Cognito Developer Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-challenge.html).
{: .callout .callout--info}

## Custom authentication flow

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

## CAPTCHA-based authentication

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