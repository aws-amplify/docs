# Lambda Triggers

Certain AWS Services can [invoke Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html) in response to lifecycle events. The Amplify CLI provides trigger templates for common use cases.

If you wish to modify the functionality of these templates, you are able to do so locally before pushing them.



## Auth

Amazon Cognito allows you to set up one Lambda trigger for certain events.  In order to create additional flexibility when configuring Cognito triggers via the CLI, the CLI will create an index file which loops through JavaScript modules.  Each template that you configure is its own JavaScript module.  

You have the opporunity to edit both the index file as well as each module.  For example, when creating a email blacklist [PreSignUp](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html) trigger, you will be asked

```bash
$ Do you want to edit the local PreSignUp lambda function now? (Y/n)

```

Selecting 'yes' will open the index file in your editor.

You will then be asked if you want to edit the individual JavaScript module for the email blacklist functionality:

```bash
$ Do you want to edit your email-filter-blacklist function now?
```

### Auth Templates

The CLI Auth workflow provides the following Lambda trigger templates:

### Custom Auth Challenge with Google reCaptcha

Captchas allow front end applications to guard against bots or other unwanted page interactions by presenting a challenge that is designed to require human intervention. The Google reCaptcha service is a popular implementation of captcha.  

This template will configure three triggers: [CreateAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-create-auth-challenge.html), [DefineAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-define-auth-challenge.html) and [VerifyAuthChallengeResponse](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-verify-auth-challenge-response.html).

The first two will essentially allow the standard username/password flow to execute unimpeded, while VerifyAuthChallengeResponse will run when the `Auth.sendCustomChallenge` function is called with the data that is returned when the user interacts with the Google reCaptcha component.  The VerifyAuthChallengeResponse Lambda function will subsequently execute a POST request to Google, and will pass the success or failure of the reCaptcha interaction back to Cognito.

#### React Sample

The following code sample demonstrates how to create a custom ConfirmSignIn component in React using the react-google-recaptcha npm package.

```js

import React from 'react';
import './App.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, SignUp, SignIn, Greetings, ConfirmSignUp, AuthPiece } from 'aws-amplify-react'; 
import ReCAPTCHA from "react-google-recaptcha";


Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    authenticationFlowType: 'CUSTOM_AUTH'
  }
});

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => Hub.dispatch('custom', {signedIn: true}))
    .catch(err => console.log(err))
};

class MyCustomConfirmation extends AuthPiece {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.show = true;
  }

  componentDidUpdate() {
    checkUser()
    Hub.listen('auth', (data) => {
      this.show = data.payload.event === 'signedIn'
    })
  }
  
  onChange(data) {
    Auth.sendCustomChallengeAnswer(this.props.authData, data)
    .then( (user) => { 
      Hub.dispatch('custom', {signedIn: true})
    })

  }

  render() {
    if (this.show) {
      return (
        <div>
        {/* only render this component when the authState is 'signUp' */}
        { this.props.authState === 'customConfirmSignIn' && 
        <div>
          <ReCAPTCHA
          sitekey="your-client-side-google-recaptcha-key"
          onChange={this.onChange}
        />
        </div>
        }
      </div>
      );
    }
  }
}

class Greeting extends React.Component {
  constructor(props){
    super(props);
    this.signedIn = false;
    Hub.listen('custom', (payload) => {
      this.signedIn = true;
    })
  }
  render() {
    if (this.signedIn) {
      return <Greetings />;
    }
    return null;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    checkUser();
  }
  render() {
    return (
      <div className="App">
        <Authenticator hideDefault={true}>
          <SignIn />
          <SignUp />
          <ConfirmSignUp />
          <Greeting />
          <MyCustomConfirmation override={'ConfirmSignIn'}/> 
          </Authenticator>
      </div>
    );
  }
}

function MyApp() {
  return <App />
}

export default MyApp;

```

#### Angular Sample

The following code sample demonstrates how to create a custom ConfirmSignIn component in Angular using the ng-recaptcha npm package.

Be sure to follow all instructions for [setting up an Angular application]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular) with aws-amplify-angular, and [configure your Amplify instance]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#switching-authentication-flow-type) to use the CUSTOM_AUTH flow.

app.module.ts:
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmplifyAngularModule,
    FormsModule,
    RecaptchaModule,
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

app.component.ts:
```js
import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cli-lambda-sample';
  confirmSignIn: boolean;
  myRecaptcha: boolean;
  user: any;
  constructor( private amplifyService: AmplifyService ) {
    this.amplifyService.authStateChange$
        .subscribe(authState => {
            this.confirmSignIn = authState.state === 'customConfirmSignIn';
            if (!authState.user) {
                this.user = null;
            } else {
                this.user = authState.user;
            }
    });
  }
  submitSignIn(e) {
    Auth.sendCustomChallengeAnswer(this.user, e)
    .then( (user) => {
      this.amplifyService.setAuthState({ state: 'signedIn', user });
    });
  }
}
```

app.component.html
```html
<amplify-authenticator [hide]="['ConfirmSignIn']"></amplify-authenticator>
<div  *ngIf="confirmSignIn">
    <re-captcha (resolved)="submitSignIn($event)" siteKey="6LdK_6UUAAAAALJ9-qgucQVtmOvpOI8CY7x2qqWg"></re-captcha>
  <button (click)="ConfirmSignIn()">Submit</button>
</div>
```

### Basic Scaffolding for a Custom Auth Challenge

This template will configure three triggers: [CreateAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-create-auth-challenge.html), [DefineAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-define-auth-challenge.html) and [VerifyAuthChallengeResponse](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-verify-auth-challenge-response.html).

It will not, however, provide a fully-formed custom authentication flow. Instead, it will create a 'hello world' custom auth flow skeleton that you can manually edit. The intent of this template is to give you a starting place for building out your own custom auth flow.

### Email Verification Link with Redirect

Cognito allows you to configure your User Pool to send an email to your users when they attempt to register an account. You can configure this email to contain a link to Cognito's Hosted UI where the user's account will be marked as confirmed. However, there is currently no means to redirect the user back to your app from this Hosted UI page.

This trigger template allows you to define an email message with a link to a static S3 bucket that you control, where the user's account will be confirmed and they can then be redirected to a URL of your choice (presumably your application). The URL will automatically contain the username as a query string parameters.

Please note that this trigger template will create an S3 resource.  The files that populate the static site are available for edit in `amplify/backend/auth/<your-resource-name>CustomMessage/assets`.  They consist of:

* index.html
* spinner.js (controls the spinner that appears on the page while users are awaiting confirmation)
* style.css
* verify.js (the script which performs the verification request)

#### React Sample

The following is an example of how to configure the aws-amplify-react authenticator so that it displays a message telling the user to check their email, instead of showing the default 'ConfirmSignUp' component.

```js
import React from 'react';
import './App.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, SignUp, SignIn, Greetings, AuthPiece } from 'aws-amplify-react'; 


Amplify.configure(awsconfig);

class MyCustomConfirmation extends AuthPiece {
  render() {
    if (this.props.authState === 'confirmSignUp') {
      return (
        <div>Check your email for a confirmation link.</div>
      );
    } else {
      return null;
    }
  }
}



class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Authenticator hideDefault={true}>
          <SignIn />
          <SignUp />
          <Greetings />
          <MyCustomConfirmation override={'ConfirmSignUp'}/> 
          </Authenticator>
      </div>
    );
  }
}

function MyApp() {
  return <App />
}

export default MyApp;
```

#### Angular Sample

The following is an example of how to configure the aws-amplify-angular authenticator so that it displays a message telling the user to check their email, instead of showing the default 'ConfirmSignUp' component.

Be sure to follow all instructions for [setting up an Angular application]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular) with aws-amplify-angular.

app.component.ts:
```js
import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cli-lambda-sample';
  confirmSignUp: boolean;
  user: any;
  constructor( private amplifyService: AmplifyService ) {
    this.amplifyService.authStateChange$
        .subscribe(authState => {
            this.confirmSignUp = authState.state === 'confirmSignUp';
            if (!authState.user) {
                this.user = null;
            } else {
                this.user = authState.user;
            }
    });
  }
}
```

app.component.html:
```html
<amplify-authenticator [hide]="['ConfirmSignUp']"></amplify-authenticator>
<div  *ngIf="confirmSignUp">
  Check your email account for a confirmation message!
</div>

```


### Add User to Group

This trigger allows you to define a Cognito group to which a user will be added upon registration.  

Please note that you will need to create the Cognito group manually.


### Email Domain Filtering (blacklist) and Email Domain Filtering (whitelist)

These two templates allow you to define email domains which are allowed or disallowed (respectively). They can be used in tandem or individually.  
