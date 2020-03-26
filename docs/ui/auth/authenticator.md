---
title: Authenticator
description: authenticator
filterKey: framework
---

<amplify-authenticator></amplify-authenticator>

<inline-fragment framework="react" src="~/ui/fragments/react/installation.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/fragments/angular/installation.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/fragments/vue/installation.md"></inline-fragment>

## Usage

<inline-fragment framework="react" src="~/ui/auth/fragments/react/usage.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/auth/fragments/angular/usage.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/auth/fragments/vue/usage.md"></inline-fragment>

<ui-component-props tag="amplify-authenticator"></ui-component-props>

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

