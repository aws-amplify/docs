---
title: Models with authorization
description: Learn more about how DataStore handles Models with finer grain authorization access checks.
---

In order to configure fine grain authorization controls with Datastore, use the `@auth` directive to specify ownership and permissible operations (create, update, delete, read) on a specific type. More information can be found on the @auth directive in the [GraphQL Transformer documentation](~/cli/graphql-transformer/auth.md).

<amplify-callout>

**Note:** This API is under development and is not released.

</amplify-callout>

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/auth-model.md"></inline-fragment>
