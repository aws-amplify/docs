import {h} from "@stencil/core";

export const AuthenticatorWithSlots = () => (
  <amplify-authenticator usernameAlias="email">
    <amplify-sign-up
      usernameAlias="email"
      formFields={[
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
      ]}
    ></amplify-sign-up>
    <amplify-sign-in slot="sign-in" usernameAlias="email"></amplify-sign-in>
  </amplify-authenticator>
);
