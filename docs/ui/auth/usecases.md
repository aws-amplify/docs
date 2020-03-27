---
title: Use cases
description: authenticator use cases
filterKey: framework
---

## Authenticate with email or phone number

The `amplify-authenticator` component has the ability to sign in / sign up with `email` or `phone_number` instead of default `username`. 

To achieve this, you first need to setup the userpool to allow email or phone number as the username [using the cli workflow](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#configuring-auth-without-social-providers) or through the [Cognito Console](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases-settings-option-2). To reflect this in the `amplify-authenticator` component, you can use the `usernameAlias` property. It can take one of the three values - `email`, `phone_number` or `username`. Default is set to `username`.

### Usage

<inline-fragment framework="react" src="~/ui/auth/fragments/react/usernameAlias.md"></inline-fragment>
<inline-fragment framework="angular" src="~/ui/auth/fragments/angular/usernameAlias.md"></inline-fragment>
<inline-fragment framework="vue" src="~/ui/auth/fragments/vue/usernameAlias.md"></inline-fragment>