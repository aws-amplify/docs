## Prerequisites
* [Setup AWS Account & Install Amplify CLI](~/start/getting-started/installation.md)

## Create a new Angular app

<inline-fragment src="~/ui/auth/fragments/angular/new-angular-app.md"></inline-fragment>

## Initialize Amplify project

```console
amplify init
```

> See [Typical Workflows](~/cli/start/workflows.md) for more information about initializing an Amplify project with Amplify CLI

## Add Auth Category

```console
amplify add auth
```

> See [Auth Overview](~/cli/auth/overview.md) for more information about setting up an Auth backend with Amplify CLI

## Push changes to your cloud backend

```console
amplify push
```

## Modify Angular App files

Replace the content inside of *app.module.ts* with the following:
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Replace the content inside of *app.component.ts* with the following:
```js
import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      if (authState === AuthState.SignedIn) {
        this.user = authData as CognitoUserInterface;
      } else if (authState === AuthState.SignedOut) {
        this.user = undefined;
      }
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
```

Replace the content inside of *app.component.html* with the following:
```html
<amplify-authenticator *ngIf="!user"></amplify-authenticator>

<div *ngIf="user">
  <amplify-greetings [username]="user.username"></amplify-greetings>
  <!-- This is where you application template code goes -->  
</div>
```

## Run the application
```
ng serve --open
```