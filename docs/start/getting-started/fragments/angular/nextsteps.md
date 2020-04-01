- [Authentication](~/lib/auth/getting-started.md)
- [DataStore](~/lib/datastore/getting-started.md)
- [User File Storage](~/lib/storage/getting-started.md)
- [Serverless APIs](~/lib/graphqlapi/getting-started.md)
- [Analytics](~/lib/analytics/getting-started.md)
- [AI/ML](~/lib/predictions/getting-started.md) 
- [Push Notification](~/lib/push-notifications/getting-started.md)
- [PubSub](~/lib/pubsub/getting-started.md)
- [AR/VR](~/lib/xr/getting-started.md)

<br>

In addition, please review the resources below regarding Angular framework support.

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
import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts` import the Amplify Module, Service, and Amplify Modules helper.  Additionally, import the amplify modules that you want to access via your Amplify provider.

These modules will then be passed into the AmplifyModules helper.

```javascript
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import Interactions from '@aws-amplify/interactions';
import Storage from '@aws-amplify/storage';

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

The authState's 'state' attribute must be a string with one of the following values:

* 'confirmSignIn'
* 'confirmSignUp'
* 'forgotPassword'
* 'requireNewPassword'
* 'signedIn'
* 'signIn'
* 'signUp