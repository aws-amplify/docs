---
---

# Angular

The `aws-amplify-angular` package is a set of Angular components and an Angular provider which helps integrate your application with the AWS-Amplify library.  It supports Angular 5.0 or above.  It also includes a [supplemental module](#ionic-4-components) for Ionic-specific components.

## Installation

Install `aws-amplify` and `aws-amplify-angular` npm packages into your Angular app.

```bash
$ npm install --save aws-amplify 
$ npm install --save aws-amplify-angular 
```

### Angular 6+ Support

Currently, the newest versions of Angular (6+) do not provide the shim for the  `global` object which was provided in previous versions.

Add the following to the top of your `polyfills.ts` file: ```(window as any).global = window;``` to recreate it.

### Setup

Create a backend configuration with the Amplify CLI and import the generated configuration file. 

In this example we will enable Authentication with Amazon Cognito User Pools as well as Amazon S3 Storage. This will create an `aws-exports.js` configuration file under your projects `src` directory. 

Ensure you have <a href="https://github.com/aws-amplify/amplify-cli" target="_blank">installed and configured the Amplify CLI</a>.
{: .callout .callout--info}

```bash
$ amplify init
$ amplify add auth
$ amplify add storage
$ amplify push
```

Visit the [Authentication Guide]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication) and [Storage Guide]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage) to learn more about enabling and configuring these categories.
{: .callout .callout--info}

After creating your backend a configuration file will be generated in your configured source directory you identified in the `amplify init` command.

Import the configuration file and load it in `main.ts`: 

```javascript
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
Amplify.configure(amplify);
```

Depending on your TypeScript version you may need to rename the `aws-exports.js` to `aws-exports.ts` prior to importing it into your app, or enable the `allowJs` <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">compiler option</a> in your tsconfig. 
{: .callout .callout--info}

When working with underlying `aws-js-sdk`, the "node" package should be included in *types* compiler option. update your `src/tsconfig.app.json`:
```json
"compilerOptions": {
    "types" : ["node"]
}
```

## Importing the Angular Module

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts` import the Amplify Module and Service:

```javascript
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
  ...
  imports: [
    ...
    AmplifyAngularModule
  ],
  ...
  providers: [
    ...
    AmplifyService
  ]
  ...
});
```

## Using Amplify Service

The `AmplifyService` provides AWS Amplify core categories and authentication state through dependency injection and observers.

### Using Dependency Injection

To use *AmplifyService* with [dependency injection](https://angular.io/guide/dependency-injection-in-action), inject it into the constructor of any component or service anywhere in your application.

```javascript
import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor( private amplifyService: AmplifyService ) {}

}
```

### Using Categories

You can access Categories via the built-in service provider:

```javascript
import { Component } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor( private amplifyService:AmplifyService ) {
      
      /** now you can access category APIs:
       * this.amplifyService.auth();          // AWS Amplify Auth
       * this.amplifyService.analytics();     // AWS Amplify Analytics
       * this.amplifyService.storage();       // AWS Amplify Storage
       * this.amplifyService.api();           // AWS Amplify API
       * this.amplifyService.cache();         // AWS Amplify Cache
       * this.amplifyService.pubsub();        // AWS Amplify PubSub
       **/
  }
  
}
```

### Subscribe to Authentication State Changes

Import `AmplifyService` into your component and listen for authentication state changes:

```javascript
import { Component } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    signedIn: boolean;
    user: any;
    greeting: string;
    constructor( private amplifyService: AmplifyService ) {
        this.amplifyService.authStateChange$
            .subscribe(authState => {
                this.signedIn = authState.state === 'signedIn';
                if (!authState.user) {
                    this.user = null;
                } else {
                    this.user = authState.user;
                    this.greeting = "Hello " + this.user.username;
                }
        });
    }
}
```

## Components

AWS Amplifies provides UI components that you can use in your view templates. 

### Authenticator

The Authenticator component creates an drop-in user authentication experience. Add the `amplify-authenticator` component to your `app.component.html` view:

```html
  <amplify-authenticator></amplify-authenticator>
```

#### SignUp Configuration
The SignUp component provides your users with the ability to sign up.  It is included as part of the ```authenticator``` component, but can also be used in isolation:

Usage: 
```<amplify-auth-sign-up [signUpConfig]="signUpConfig"></amplify-auth-sign-up>```
or
```<amplify-authenticator [signUpConfig]="signUpConfig"></amplify-authenticator>```

The SignUp Component accepts a 'signUpConfig' object which allows you to customize it.

{% include sign-up-attributes.html %}

The signUpFields array in turn consist of an array of objects, each describing a field that will appear in sign up form that your users fill out:

{% include sign-up-fields.html %}


### Photo Picker

The Photo Picker component will render a file upload control that will allow choosing a local image and uploading it to Amazon S3. Once an image is selected, a base64 encoded image preview will be displayed automatically. To render photo picker in an Angular view, use *amplify-photo-picker* component:

```html
<amplify-photo-picker 
    path="pics"
    (picked)="onImagePicked($event)"
    (loaded)="onImageLoaded($event)">
</amplify-photo-picker>
```

 - `(picked)` - Emitted when an image is selected. The event will contain the `File` object which can be used for upload.
 - `(loaded)` - Emitted when an image preview has been rendered and displayed.
 - `path` - An optional S3 image path (prefix).
 - `storageOptions` - An object passed within the ‘options’ property in the Storage.put request. This can be used to set the permissions ‘level’ property of the objects being uploaded i.e. ‘private’, ‘protected’, or ‘public’.

 [Learn more about S3 permissions.]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#file-access-levels).

### Album

The Album component will display a list of images from the configured S3 Storage bucket. Use the *amplify-s3-album* component in your Angular view:

```html
<amplify-s3-album 
    path="pics" 
    (selected)="onAlbumImageSelected($event)">
</amplify-s3-album>
```
- `options` - object which is passed as the 'options' parameter to the .get request.  This can be used to set the 'level' of the objects being requested (i.e. 'protected', 'private', or 'public')
- `(selected)` - event used to retrieve the S3 signed URL of the clicked image:

```javascript
onAlbumImageSelected( event ) {
      window.open( event, '_blank' );
}
```

### Interactions

The `amplify-interactions` component provides you with a drop-in Chat component that supports seven properties:

1. `bot`:  The name of the Amazon Lex Chatbot

2. `clearComplete`:  Indicates whether or not the messages should be cleared at the
end of the conversation.

3. `complete`: Dispatched when the conversation is completed.
4.  `voiceConfig`: If needed, you can also pass `voiceConfig` from your app component to modify the silence detection parameters, like in this example:

```js
customVoiceConfig = {
    silenceDetectionConfig: {
        time: 2000,
        amplitude: 0.2
    }   
}

```
5. `voiceEnabled`: Enables voice user input. Defaults to `false` 

Note: In order for voice input to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:
```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

6. `textEnabled`: Enables text user input Defaults to `true`
7. `conversationModeOn`: Turns voice conversation mode on/off. Defaults to `off`

```html
<amplify-interactions 
    bot="yourBotName" 
    clearComplete="true" 
    (complete)="onBotComplete($event)"
    [conversationModeOn]="false"
    [voiceConfig]="{customVoiceConfig}"
    [voiceEnabled]="true"
    [textEnabled]="true">
</amplify-interactions>
```

See the [Interactions documentation]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/interactions) for information on creating an Amazon Lex Chatbot.

### XR

#### Sumerian Scene

The `amplify-sumerian-scene` component provides you with a prebuilt UI for loading and displaying Amazon Sumerian scenes inside of your website:

{% include_relative common/scene-size-note.md %}

```javascript
// sceneName: the configured friendly scene you would like to load
<amplify-sumerian-scene sceneName="scene1"></amplify-sumerian-scene>
```

See the [XR documentation]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/xr) for information on creating and publishing a Sumerian scene.

### Styles

To use the aws-amplify-angular components you will need to install '@aws-amplify/ui'.

Add the following to your styles.css file to use the default styles:
```@import '~aws-amplify-angular/Theme.css';```

You can use custom styling for components by importing your custom *styles.css* that overrides the <a href="https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-angular/src/theme.css" target="_blank">default styles</a>.

## Ionic 4 Components
The Angular components included in this library can optionally be presented with Ionic-specific styling.  To do so, simply include the ```AmplifyIonicModule``` alongside the ```AmplifyAngularModule```.  Then, pass in ```framework="Ionic"``` into the component.  

Example:

```html
  ...
  <amplify-authenticator framework="Ionic"></amplify-authenticator>
  ...
```

This will cause a ```ComponentFactoryResolver``` to display an Ionic version of the desired component.  You can also bypass the ```ComponentFactoryResolver``` by using the vanilla Angular or Ionic components directly using the ```-core``` or ```-ionic``` suffix.

Example:

```html
  ...
  <amplify-authenticator-ionic></amplify-authenticator-ionic>
  ...
```



