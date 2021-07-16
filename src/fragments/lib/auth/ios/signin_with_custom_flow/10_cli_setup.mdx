In terminal, navigate to your project, run `amplify add auth`, and choose the following options:


```terminal
? Do you want to use the default authentication and security configuration? Manual configuration?
    `Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)`
? Please provide a friendly name for your resource that will be used to label this category in the project: 
    `<hit enter to take default or enter a custom label>`
? Please enter a name for your identity pool. 
    `<hit enter to take default or enter a custom name>`
? Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) 
    `No`
? Do you want to enable 3rd party authentication providers in your identity pool? 
    `No`
? Please provide a name for your user pool:
    `<hit enter to take default or enter a custom name>`
? How do you want users to be able to sign in? 
    `Username`
? Do you want to add User Pool Groups? 
    `No`
? Do you want to add an admin queries API? 
    `No`
? Multifactor authentication (MFA) user login options: 
    `OFF`
? Email based user registration/forgot password: 
    `Enabled (Requires per-user email entry at registration)`
? Please specify an email verification subject: 
    `Your verification code`
? Please specify an email verification message: 
    `Your verification code is {####}`
? Do you want to override the default password policy for this User Pool? 
    `No`
? What attributes are required for signing up? 
    `Email`
? Specify the app's refresh token expiration period (in days): 
    `30`
? Do you want to specify the user attributes this app can read and write? 
    `No`
? Do you want to enable any of the following capabilities? 
    `NA`
? Do you want to use an OAuth flow? 
    `No`
? Do you want to configure Lambda Triggers for Cognito? 
    `Yes`
? Which triggers do you want to enable for Cognito? 
    `Create Auth Challenge, Define Auth Challenge, Verify Auth Challenge Response`
? What functionality do you want to use for Create Auth Challenge?
    `Custom Auth Challenge Scaffolding (Creation)`
? What functionality do you want to use for Define Auth Challenge? 
    `Custom Auth Challenge Scaffolding (Definition)`
? What functionality do you want to use for Verify Auth Challenge Response? 
    `Custom Auth Challenge Scaffolding (Verification)`
? Enter the answer to your custom auth challenge 
    `1234`

? Do you want to edit your boilerplate-create-challenge function now? 
    `Yes`
? Please edit the file in your editor: <local file path>/src/boilerplate-create-challenge.js
```
The boilerplate for Create Auth Challenge opens in your favorite code editor. Enter the following code to this file:

```js
function createAuthChallenge(event) {
    if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
        event.response.publicChallengeParameters = {};
        event.response.privateChallengeParameters = {};
        event.response.privateChallengeParameters.answer = process.env.CHALLENGEANSWER;
    }
}

exports.handler = (event, context, callback) => {
    createAuthChallenge(event);
    callback(null, event);
};
```
Amazon Cognito invokes the Create Auth Challenge trigger after Define Auth Challenge to create a custom challenge. In this lambda trigger we define the challenge to present to the user. `privateChallengeParameters` contains all the information to validate the response from the user.
Save and close the file, then switch back to the terminal and follow the instructions:

```
? Press enter to continue
    `Hit Enter`

? Do you want to edit your boilerplate-define-challenge function now? 
    `Yes`
? Please edit the file in your editor: <local file path>/src/boilerplate-define-challenge.js
```
The boilerplate for Define Auth Challenge opens in your favorite code editor. Enter the following code to this file:

```js
exports.handler = function(event, context) {
if (event.request.session.length == 1 && event.request.session[0].challengeName == 'SRP_A') {
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
} else if (event.request.session.length == 2 && event.request.session[1].challengeName == 'CUSTOM_CHALLENGE' && event.request.session[1].challengeResult == true) {
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
} else {
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
}
    context.done(null, event);
}
```
Amazon Cognito invokes the Define Auth Challenge trigger to initiate the custom authentication flow.

The Amplify Auth library always starts with an SRP_A flow, so in the code above, we bypass SRP_A and return `CUSTOM_CHALLENGE` in the first step. In the second step, if `CUSTOM_CHALLENGE` return with `challengeResult == true` we recognize the custom auth challenge is successful, and tell Cognito to issue tokens. In the last `else` block we tell Cognito to fail the authentication flow.

Save and close the file, then switch back to the terminal and follow the instructions:

```
? Press enter to continue
    `Hit Enter`

? Do you want to edit your boilerplate-verify function now?
    `Yes`
? Please edit the file in your editor: <local file path>/src/boilerplate-verify.js
```
The boilerplate for Verify Auth Challenge opens in your favorite code editor. Enter the following code to this file:

```js
function verifyAuthChallengeResponse(event) {
    if (event.request.privateChallengeParameters.answer === event.request.challengeAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
}

exports.handler = (event, context, callback) => {
    verifyAuthChallengeResponse(event);
    callback(null, event);
};
```
Amazon Cognito invokes the Verify Auth Challenge trigger to verify if the response from the end user for a custom challenge is valid or not. The response from the user will be available in `event.request.challengeAnswer`. The code above compares that with `privateChallengeParameters` value set in the Create Auth Challenge trigger.
Save and close the file, then switch back to the terminal and follow the instructions:

```
? Press enter to continue
    `Hit Enter`
```

Once finished, run `amplify push` to publish your changes.
