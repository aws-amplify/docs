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
  title = 'ionic-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
```

Replace the content inside of *app.component.html* with the following:
```html
<amplify-authenticator *ngIf="authState !== 'signedin'"></amplify-authenticator>

<div *ngIf="authState === 'signedin' && user" class="App">
    <amplify-sign-out></amplify-sign-out>
    <div>Hello, {{user.username}}</div>
    <!-- This is where you application template code goes -->  
</div>
```