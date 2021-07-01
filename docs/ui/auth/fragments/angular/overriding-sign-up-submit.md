_app.component.html_

```html
<amplify-authenticator>
    <amplify-sign-up slot="sign-up" [handleSignUp]="handleSignUp">
    </amplify-sign-up>
</amplify-authenticator>
```

_app.component.ts_

```ts
import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public async handleSignUp(formData) {
    const param = {
      ...formData,
      attributes: {
        ...formData.attributes,
        'custom:favorite_flavor': 'Cookie Dough'
      }
    }
    const data = await Auth.signUp(param);
    return data;
  }
}
```