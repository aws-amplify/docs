---
title: Authenticator
description: authenticator
filterKey: framework
---

The simplest way to add authentication flows into your app is to use the Authenticator component.

<amplify-authenticator></amplify-authenticator>

<inline-fragment framework="react" src="~/ui/fragments/react/installation.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/fragments/angular/installation.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/fragments/vue/installation.md"></inline-fragment>

## Usage

<inline-fragment framework="react" src="~/ui/auth/fragments/react/usage.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/auth/fragments/angular/usage.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/auth/fragments/vue/usage.md"></inline-fragment>

<ui-component-props tag="amplify-authenticator" use-table-headers></ui-component-props>

## Slots

| Name                     | Description                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `sign-in`              | Content placed inside of the sign in workflow for when a user wants to sign into their account                         |
| `confirm-sign-in`      | Content placed inside of the confirm sign in workflow for when a user needs to confirm the account they signed in with |
| `sign-up`              | Content placed inside of the sign up workflow for when a user wants to register a new account                          |
| `confirm-sign-up`      | Content placed inside of the confirm sign up workflow for when a user needs to confirm the account they signed up with |
| `forgot-password`      | Content placed inside of the forgot password workflow for when a user wants to reset their password                    |
| `require-new-password` | Content placed inside of the require new password workflow for when a user is required to update their password        |
| `verify-contact`       | Content placed inside of the verify-contact workflow for when a user must verify their contact information             |
| `totp-setup`           | Content placed inside of the totp-setup workflow for when a user opts to use TOTP MFA                                  |
| `greetings`            | Content placed inside of the greetings navigation for when a user is signed in                                         |

## Sub Components

### Sign In

<amplify-sign-in></amplify-sign-in>

<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up></amplify-sign-up>

<ui-component-props tag="amplify-sign-up"></ui-component-props>

### Sign Out

<amplify-sign-out></amplify-sign-out>

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in></amplify-confirm-sign-in>

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up></amplify-confirm-sign-up>

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password></amplify-forgot-password>

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password></amplify-require-new-password>

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

<ui-component-props tag="amplify-verify-contact"></ui-component-props>

### Greetings

<amplify-greetings></amplify-greetings>

<ui-component-props tag="amplify-greetings"></ui-component-props>

