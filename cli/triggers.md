# Lamba Triggers

Certain AWS Services can [invoke Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html) in response to lifecycle events.  The Amplify CLI provides trigger templates for common use cases.

If you wish to modify the functionality of these templates, you are able to do so locally before pushing them.

## Auth

The CLI Auth workflow provides the following Lambda trigger templates:

### Custom Auth Challenge with Google reCaptcha

Captchas allow front end applications to guards against bots or other unwanted page interactions by presenting a challenge that is designed to require human intervention.  The Google reCaptcha service is a popular implementation of captcha.  

This template will configure three triggers: CreateAuthChallenge, DefineAuthChallenge and VerifyAuthChallengeResponse.

The first two will essentially allow the standard username/password flow to execute unimpeded, while VerifyAuthChallengeResponse will accept data from your client-side captcha component and verify it against Google's reCaptcha service via axios.

The following code sample demonstrates how to create a custom ConfirmSignIn component in React using the react-google-recaptcha npm package.

```js

import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, SignUp, SignIn, Greetings, ConfirmSignUp, AuthPiece } from 'aws-amplify-react'; 
import ReCAPTCHA from "react-google-recaptcha";

// Amplify.configure(awsconfig)
Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    authenticationFlowType: 'CUSTOM_AUTH'
  }
});


class MyCustomConfirmation extends AuthPiece {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(data) {
    debugger; 
    Auth.sendCustomChallengeAnswer(this.props.authData, data)
    .then( (user) => { console.log('back from challenge: ', user) })

  }

  render() {
    return (
      <div>
      {/* only render this component when the authState is 'signUp' */}
      { this.props.authState === 'customConfirmSignIn' && 
      <div>
       <ReCAPTCHA
        sitekey="you-client-side-key"
        onChange={this.onChange}
      />
      </div>
      }
    </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Authenticator hideDefault={true}>
        <SignIn />
        <SignUp />
        <ConfirmSignUp />
        <Greetings />
        <MyCustomConfirmation override={'ConfirmSignIn'}/> 
        </Authenticator>
    </div>
  );
}

export default App;
```

### Basic Scaffolding for a Custom Auth Challenge

This template will configure three triggers: CreateAuthChallenge, DefineAuthChallenge and VerifyAuthChallengeResponse.

It will not, however, provide a fully-formed custom authentication flow.  Instead, it will create a 'hello world' custom auth flow skeleton that you can manually edit.  The intent of this template is to give you a starting place.

### Email Verification Link with Redirect

Cognito allows you to configure your User Pool to send an email to your users when they attempt to register an account.  You can configure this email to contain a link to Cognito's Hosted UI where the user's account will be marked as confirmed.  However, there is currently no means to redirect the user back to your app from this Hosted UI page.

This trigger template allows you to define an email message with a link to a static S3 bucket that you control, where the user's account will be confirmed and they can then be redirected to a URL of your choice (presumable your application).  The URL will automatically contain the username as a query string paramenters

Please note that this trigger template will create an S3 resource.

### Add User to Group

This trigger allows you to define a Cognito group to which a user will be added upon registration.  

Please note that you will need to create the Cognito group manually.


### Email Domain Filtering (blacklist) and Email Domain Filtering (whitelist)

These two templates allow you to define email domains which are allowed or disallowed (respectively).  They can be used in tandem or individually.  