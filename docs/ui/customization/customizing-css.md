---
title: Customizing CSS
description: Managing the layout and styling of Components
---

You can control top level components directly using CSS. For instance, to control the layout of the `amplify-authenticator`, we can specify the properties directly inside of its selector.

```css
amplify-authenticator {
  background: tomato;
  padding: 5px;
}
```

The top level control is available for the following components. _**Note:**_ The components needs to be rolled out in the client in order to enable this CSS update.

- `amplify-sign-in`
- `amplify-confirm-sign-in`
- `amplify-sign-up`
- `amplify-confirm-sign-up`
- `amplify-forgot-password`
- `amplify-require-new-password`
- `amplify-verify-contact`
- `amplify-totp-setup`
