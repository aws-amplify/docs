<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

Replace the content inside of *app.component.ts* with the following:
```js
import { Component, OnInit, NgZone } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      
      this.zone.run(() => {
        //If you have calls to Angular services, Angular components, or other Angular-specific functionality, place it here.
      });
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
