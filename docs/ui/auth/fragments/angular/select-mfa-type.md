**Usage**

```jsx
// Required in order to not have the default message of "Less than two mfa types available"
const MFATypeOptions = {
  SMS: true,
  Optional: true,
  TOTP: true,
};

<amplify-select-mfa-type MFATypes={MFATypeOptions}></amplify-select-mfa-type>;
```

<ui-component-props tag="amplify-select-mfa-type" use-table-headers prop-type="attr"></ui-component-props>
