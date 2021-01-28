The `aws-amplify-angular` package is a set of Angular components and an Angular provider which helps integrate your application with the AWS-Amplify library.  It supports Angular 5.0 and above.

<amplify-callout>

Angular 9 is not supported in the legacy version of the Angular UI Components. If you app in using Angular 9, please see our new [Angular UI Component package](~/ui/ui.md/q/framework/angular).

</amplify-callout>

## Installation

Install `aws-amplify` and `aws-amplify-angular` npm packages into your Angular app.

```bash
npm install aws-amplify aws-amplify-angular 
```

### Angular 6-8 Support

Currently, the newest versions of Angular (6+) do not include shims for 'global' or 'process' which were provided in previous versions. Add the following to your `polyfills.ts` file to recreate them: 

```javascript
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
``` 

Please also note that the AWS Amplify Angular components do not yet support Ivy.

### Setup

Create a backend configuration with the Amplify CLI and import the generated configuration file. 

In this example we will enable Authentication with Amazon Cognito User Pools as well as Amazon S3 Storage. This will create an `aws-exports.js` configuration file under your projects `src` directory. 

Ensure you have installed and configured the [Amplify CLI](~/cli/start/install.md)

```bash
amplify init
amplify add auth
amplify add storage
amplify push
```

Visit the [Authentication Guide](~/lib/auth/getting-started.md) and [Storage Guide](~/lib/storage/getting-started.md) to learn more about enabling and configuring these categories.

After creating your backend a configuration file will be generated in your configured source directory you identified in the `amplify init` command.

When working with underlying `aws-js-sdk`, the "node" package should be included in *types* compiler option. update your `src/tsconfig.app.json`:
```json
"compilerOptions": {
    "types" : ["node"]
}
```

## Importing the Amplify Angular Module and the Amplify Provider

The 'aws-amplify-angular' package allows you to access the Amplify JS library as an Angular provider.  You have two options to choose from:

1. Configure the provider with the entire Amplify JS library
2. Configure the provider with only select Amplify JS library.

Option 1 is appropriate when you plan to use every Amplify JS module or if you are not concerned about bundle size.  Option 2 is appropriate when bundle size is a concern.  


### Option 1: Configuring the Amplify provider with every Amplify JS module

Import the configuration file and load it in `main.ts`: 

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```


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

### Option 2: Configuring the Amplify provider with specified Amplify JS modules

Import the configuration file and load it in `main.ts`: 

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts` import the Amplify Module, Service, and Amplify Modules helper.  Additionally, import the amplify modules that you want to access via your Amplify provider.

These modules will then be passed into the AmplifyModules helper.

```javascript
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import { Auth, Interactions, Storage } from 'aws-amplify';

@NgModule({
  ...
  imports: [
    ...
    AmplifyAngularModule
  ],
  ...
    providers: [
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth,
          Storage,
          Interactions
        });
      }
    }
  ],
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

## Styles

To use the aws-amplify-angular components you will need to install '@aws-amplify/ui'.

Add the following to your styles.css file to use the default styles:
```@import '~aws-amplify-angular/Theme.css';```

You can use custom styling for components by importing your custom *styles.css* that overrides the <a href="https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-angular/theme.css" target="_blank">default styles</a>.
