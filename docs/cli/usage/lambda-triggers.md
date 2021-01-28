---
title: Lambda Triggers
description: Lambda triggers are useful for adding functionality during certain lifecycles of the user's journey. Associate a Lambda trigger with an auth scenario, S3 bucket, DynamoDB table or Kinesis Stream managed through the Amplify CLI.
---

Lambda triggers are useful for adding functionality during certain lifecycles of the user's journey. Amplify ships common trigger templates which you can enable and modify (if necessary) through a few simple questions.

## Cognito Lambda Triggers

Certain AWS Services can [invoke Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html) in response to lifecycle events. The Amplify CLI provides trigger templates for common use cases.

If you wish to modify the functionality of these templates, you are able to do so locally before pushing them.  After selecting the templates via the CLI, your local copy of the templates are located in `amplify/backend/function/<function-name>/src`.

Amazon Cognito allows you to set up one Lambda trigger per event.  In order to create additional flexibility when configuring Cognito triggers via the CLI, the CLI will create an index file which loops through JavaScript modules.  Each template that you configure is its own JavaScript module. This allows you to attach multiple use cases and logical flows to a single lifecycle event.

You have the opportunity to edit both the index file as well as each module. For example, when creating a email deny list [PreSignUp](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html) trigger, you will be asked

```console
$ Do you want to edit the local PreSignUp lambda function now? (Y/n)
```

Selecting 'yes' will open the index file in your editor.

You will then be asked if you want to edit the individual JavaScript module for the email deny list functionality:

```console
$ Do you want to edit your email-filter-deny-list function now?
```

### Set up Lambda triggers

There are two ways to setup Lambda Triggers for your Cognito User Pool.

1. In the default Auth CLI workflow, you will be presented with a list of Lambda Trigger templates if you opt to configure advanced settings:

```console
$ Do you want to enable any of the following capabilities?
  ❯ ◯ Add Google reCaptcha Challenge
    ◯ Email Verification Link with Redirect
    ◯ Add User to Group
    ◯ Email Domain Filtering (deny list)
    ◯ Email Domain Filtering (allow list)
    ◯ Custom Auth Challenge Flow (basic scaffolding - not for production)
    ◯ Override ID Token Claims
```

2.  In the manual Auth CLI workflow, you will be given the chance to select the options above, but will also be able to manually configure Lambda Trigger templates:

```console
$ Do you want to configure Lambda Triggers for Cognito? Yes

$ Which triggers do you want to enable for Cognito?
◯ Learn More
 ──────────────
 ◯ Create Auth Challenge
❯◉ Custom Message
 ◯ Define Auth Challenge
 ◯ Post Authentication
 ◯ Post Confirmation
 ◯ Pre Sign-up
 ◯ Verify Auth Challenge Response
 ◯ Pre Token Generation

$ What functionality do you want to use for Custom Message
 ◯ Learn More
 ──────────────
❯◉ Send Account Confirmation Link w/ Redirect
 ◯ Create your own module
```

If your manually-configured Lambda Triggers require enhanced permissions, you can run `amplify function update` after they have been initially configured.

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

class MyCustomConfirmation extends AuthPiece {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(data) {
    Auth.sendCustomChallengeAnswer(this.props.authData, data)
    .then( (user) => {
      console.log('user signed in!: ', user)
      this.changeState('signedIn', user);
    })

  }

  render() {
    if (this.props.authState === 'customConfirmSignIn') {
      return (
        <div>
          <ReCAPTCHA
          sitekey="your-client-side-google-recaptcha-key"
          onChange={this.onChange}
          />
        </div>  
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
            <ConfirmSignUp />
            <Greetings />
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

> Be sure to follow all instructions for [setting up an Angular application](~/start/start.md) with aws-amplify-angular, and [configure your Amplify instance](~/lib/auth/switch-auth.md) to use the CUSTOM_AUTH flow.

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
import { Auth } from 'aws-amplify';
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
    <re-captcha (resolved)="submitSignIn($event)" siteKey="your-client-side-google-recaptcha-key"></re-captcha>
</div>
```

#### Vue Sample

The following code sample demonstrates how to create a custom ConfirmSignIn component in Vue using the vue-recaptcha npm package.

App.vue
```javascript
<template>
  <div id="app">
    <amplify-authenticator></amplify-authenticator>
    <vue-recaptcha
      v-if="customConfirmSignIn"
      sitekey="your-client-side-google-recaptcha-key" @verify="onVerify"
    ></vue-recaptcha>
    <amplify-sign-out
      v-if="signedIn"
    ></amplify-sign-out>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue';
import VueRecaptcha from 'vue-recaptcha';


export default {
  name: 'app',
  components: {
    VueRecaptcha,
    ...components
  },
  data() {
    return {
      challengeResponse: '',
      customConfirmSignIn: false,
      signedIn: false,
      user: {},
    }
  },
  mounted: async function () {
    await this.$Amplify.Auth.currentAuthenticatedUser()
      .then((user) => {
        this.user = user;
        this.signedIn = true;
      })
      .catch((e) => {
        console.log('currentUser error', e)
      })
    AmplifyEventBus.$on('authState', info => {
      this.customConfirmSignIn = info === 'customConfirmSignIn';
      this.signedIn = info === 'signedIn';
    });
    AmplifyEventBus.$on('localUser', user => {
      this.user = user;
    });
  },
  methods: {
    onVerify: function (data) {
      this.$Amplify.Auth.sendCustomChallengeAnswer(this.user, data)
        .then( (user) => {
          AmplifyEventBus.$emit('authState', 'signedIn')
          return AmplifyEventBus.$emit('localUser', user)
        })
        .catch(function (err) { console.log('challenge error: ', err) });
    },           
  }
}
</script>
```

main.js
```js
import Vue from 'vue'
import App from './App.vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure({
  Auth: {
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    authenticationFlowType: 'CUSTOM_AUTH'
  }
});
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

Finally, in public/index.html add the following script:
```html
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>
```

### Basic Scaffolding for a Custom Auth Challenge

This template will configure three triggers: [CreateAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-create-auth-challenge.html), [DefineAuthChallenge](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-define-auth-challenge.html) and [VerifyAuthChallengeResponse](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-verify-auth-challenge-response.html).

It will not, however, provide a fully-formed custom authentication flow. Instead, it will create a 'hello world' custom auth flow skeleton that you can manually edit. The intent of this template is to give you a starting place for building out your own custom auth flow.

### Email Verification Link with Redirect

Cognito allows you to configure your User Pool to send an email to your users when they attempt to register an account. You can configure this email to contain a link to Cognito's Hosted UI where the user's account will be marked as confirmed.

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

Be sure to follow all instructions for [setting up an Angular application](~/start/start.md) with aws-amplify-angular.

app.component.ts:
```js
import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
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

#### Vue Sample

The following is an example of how to configure the aws-amplify-vue authenticator components so that your app displays a message telling the user to check their email, instead of showing the default 'ConfirmSignUp' component.

```javascript
<template>
  <div id="app">
    <amplify-sign-up v-if="signUp"></amplify-sign-up>
    <amplify-sign-in v-if="signIn"  v-bind:usernameAttributes="usernameAttributes"></amplify-sign-in>
    <div v-if="confirming">Check your email for a confirmation email</div>
    <amplify-sign-out
      v-if="signedIn"
    ></amplify-sign-out>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue';
import VueRecaptcha from 'vue-recaptcha';


export default {
  name: 'app',
  components: {
    VueRecaptcha,
    ...components
  },
  data() {
    return {
      signIn: true,
      signUp: false,
      confirming: false,
      usernameAttributes: 'username',
      user: {},
    }
  },
  mounted: async function () {
    await this.$Amplify.Auth.currentAuthenticatedUser()
      .then((user) => {
        this.user = user;
        this.signIn = false;
      })
      .catch((e) => {
        console.log('currentUser error', e)
      })
    AmplifyEventBus.$on('authState', info => {
      this.signIn = info === 'signIn' || info === 'signedOut';
      this.confirming = info === 'confirmSignUp';
      this.signUp = info === 'signUp';
      this.signedIn = info === 'signedIn';
    });
    AmplifyEventBus.$on('localUser', user => {
      this.user = user;
    });
  }
}
</script>
```

### Add User to Group

This trigger allows you to define a Cognito group to which a user will be added upon registration.  

The trigger will check for the existence of the group in your User Pool, and will create the group if it is not present.


### Email Domain Filtering (deny list) and Email Domain Filtering (allow list)

These two templates allow you to define email domains which are allowed or disallowed (respectively). They can be used in tandem or individually.  

### Override ID Token Claims

This template uses the Pre Token Generation trigger and allows you to add, override or remove claims from the [ID token](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html#amazon-cognito-user-pools-using-the-id-token) that is returned by Cognito.

You will need to manually edit the template to define the claims that you wish to manipulate. The template currently contains dummy values as examples.


## S3 Lambda Triggers

You can associate a trigger to an S3 bucket managed by the Amplify CLI, by following the `amplify add/update storage` flows. When attempting to add/update an S3 storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your S3 Bucket? Yes
? Select from the following options
❯ Choose an existing function from the project
  Create a new function
```
As you can see in the prompt above, you can either choose to use an existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function to handle S3 events. We also auto-populate the IAM policies required by the Lambda execution role of the newly created function to access the S3 bucket.

***Note***: You can associate only one Lambda Function trigger to an S3 bucket.

## DynamoDB Lambda Triggers

You can associate a Lambda trigger with a DynamoDB table, managed by the Amplify CLI. There are two ways by which DynamoDB is provisioned by the Amplify CLI

- As a part of the [Storage category](~/cli/storage/overview.md#)
- As a part of the [GraphQL API (types with @model annotation)](~/cli/graphql-transformer/model.md)


### As a part of the Storage category

You can add and manage a DynamoDB table to your Amplify project using the amplify add/update storage flows. When attempting to add/update a DynamoDB storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your Table? Yes
? Select from the following options (Use arrow keys)
❯ Choose an existing function from the project
  Create a new function
```

As you can see in the prompt above, you can either choose to use an already existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function handle DynamoDB events.

***Note***: You can associate more than one Lambda Function trigger to a DynamoDB table.

### As a part of the GraphQL API (types with @model annotation)

You can also associate a Lambda trigger with any of the GraphQL transformer schema's DynamoDB backed @models which you can add via `amplify add api`. GraphQL mutations that result in DynamoDB item changes will in turn result in change records published to DynamoDB streams that can trigger a Lambda function. To create such a function, start with adding a new lambda function with:

```bash
$ amplify add function
```

Proceed by providing a name and selecting a Lambda Trigger template:

```bash
? Provide a friendly name for your resource to be used as a label for this category in the project: testtrigger
? Provide the AWS Lambda function name: mytrigger
? Choose the function template that you want to use:
  Hello world function
  CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)
  Serverless express function (Integration with Amazon API Gateway)
❯ Lambda Trigger
```

Then select `Amazon DynamoDB Stream` when prompted with event source question.

```bash
? What event source do you want to associate with Lambda trigger (Use arrow keys)
❯ Amazon DynamoDB Stream
  Amazon Kinesis Stream
```

Now select `API category graphql @model backed DynamoDB table`.

```
?
> Use API category graphql @model backed DynamoDB table(s) in the current Amplify project
  Use storage category DynamoDB table configured in the current Amplify project
  Provide the ARN of DynamoDB stream directly
```
After the above question, you can select one of the types annotated by @model for which you want to add a trigger for.

On completion of the above mentioned flow, a boilerplate lambda function trigger will be created in your `amplify/backend/function` directory with the following template:

```js
exports.handler = function (event, context) {
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  context.done(null, 'Successfully processed DynamoDB record');
};
```

`record.dynamodb` will contain a DynamoDB change json describing the item changed in DynamoDB table.
Please note that it does not represent an original and new item as stored in DynamoDB table. To retrieve a original and new item you need to convert a DynamoDB json to original form:

```js
const AWS = require('aws-sdk');
const records = event.Records.map(record => ({
  new: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage),
  old: AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage)
}));
```

## Kinesis Stream Trigger

Amplify Analytics category Kinesis stream resource can be also used as an event source for Lambda triggers. Event published to Kinesis stream will trigger a lambda function. You can add a Kinesis stream to your Amplify project by going through the `amplify add analytics` flow. To create a Lambda trigger for the Kinesis Stream, start with adding a new lambda function:

```bash
$ amplify add function
```

Proceed by providing a name and selecting a Lambda Trigger template:

```bash
? Provide a friendly name for your resource to be used as a label for this category in the project: testtrigger
? Provide the AWS Lambda function name: mytrigger
? Choose the function template that you want to use:
  Hello world function
  CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)
  Serverless express function (Integration with Amazon API Gateway)
❯ Lambda Trigger
```

Then select `Amazon Kinesis Stream` when prompted with event source question and select the resource.

```bash
? What event source do you want to associate with Lambda trigger (Use arrow keys)
  Amazon DynamoDB Stream
❯ Amazon Kinesis Stream
? Choose a Kinesis event source option (Use arrow keys)
❯ Use Analytics category kinesis stream in the current Amplify project
  Provide the ARN of Kinesis stream directly
```


After the completion of the above flow, a Lambda function will be created in your `amplify/backend/function` directory and will be invoked when a new event is pushed to a Kinesis stream. Please refer to [Working with the API](~/lib/analytics/getting-started.md) to learn more about publishing your events to Kinesis stream.
