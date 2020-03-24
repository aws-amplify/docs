---
title: Authenticator
description: authenticator
filterKey: framework
---

## Example

<amplify-authenticator></amplify-authenticator>

## Usage

<inline-fragment framework="react" src="~/ui/components/fragments/react/authenticator.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/components/fragments/angular/authenticator.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/components/fragments/vue/authenticator.md"></inline-fragment>

## Properties

| Property           | Attribute            | Description                                                                                                                     | Type                                      | Default            |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------ |
| `federated`        | --                   | Federated credentials & configuration.                                                                                          | `FederatedConfig`                         | `undefined`        |
| `initialAuthState` | `initial-auth-state` | Initial starting state of the Authenticator component. E.g. If `signup` is passed the default component is set to AmplifySignUp | `AuthState.SignIn \| AuthState.SignUp`    | `AuthState.SignIn` |
| `usernameAlias`    | `username-alias`     | Username Alias is used to setup authentication with `username`, `email` or `phone_number`                                       | `"email" \| "phone_number" \| "username"` | `undefined`        |


