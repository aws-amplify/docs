<amplify-select-mfa-type MFATypes={SMS: true, Optional: true, TOTP: true}></amplify-select-mfa-type>

**Usage**

```jsx
// Required in order to not have the default message of "Less than two mfa types available"
const MFATypeOptions = {
  SMS: true,
  Optional: true,
  TOTP: true,
};

<AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>
```

<ui-component-props tag="amplify-select-mfa-type" use-table-headers></ui-component-props>
