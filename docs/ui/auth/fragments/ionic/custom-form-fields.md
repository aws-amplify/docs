*app.component.ts*
```js
import { Component } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formFields: FormFieldTypes;

  constructor() {
    this.formFields = [
      {
        type: "email",
        label: "Custom email Label",
        placeholder: "custom email placeholder",
        required: true,
      },
      {
        type: "password",
        label: "Custom Password Label",
        placeholder: "custom password placeholder",
        required: true,
      },
      {
        type: "phone_number",
        label: "Custom Phone Label",
        placeholder: "custom Phone placeholder",
        required: false,
      },
    ];
  }
}
```

*app.component.html*

```html
<amplify-authenticator usernameAlias="email">
  <amplify-sign-up
    slot="sign-up"
    usernameAlias="email"
    [formFields]="formFields"
  ></amplify-sign-up>
  <amplify-sign-in slot="sign-in" usernameAlias="email"></amplify-sign-in>
</amplify-authenticator>
```