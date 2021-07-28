Amplify gives you the ability to limit which individuals or groups should have access to create, read, update, or delete data on your types by specifying an `@auth` directive.

Here's a high-level overview of the authorization scenarios we support in the Amplify libraries. Each scenario has options you can tune to fit the needs of your application.

* [**Owner Based Authorization**](#owner-based-authorization): Limit a model instance's access to an "owner" and defines authorization rules for those owners. Backed by Cognito User Pool.
* [**Static Group Authorization**](#static-group-authorization): Limit a model instance's access to a specific group of users and define authorization rules for that group. Backend by Cognito User Pool.
* [**Owner and Static Group Combined**](#owner-and-static-group-combined): Uses a combination of both *Owner Based Authorization* and *Static Group Authorization* to control ownership and access.
* [**Public Authorization**](#public-authorization): Allow public access to your model instances. Backed by an API Key or IAM.
* [**Private Authorization**](#private-authorization): Allow any signed-in user to access your model instances. Backed by IAM or Cognito User Pool.
* [**Owner based Authorization with OIDC provider**](#owner-based-authorization-with-oidc-provider): Use a 3rd party OIDC Provider to achieve *Owner based authorization*.
* [**Static Group Authorization with OIDC provider**](#static-group-authorization-with-oidc-provider): Use a 3rd party OIDC Provider to achieve *Static group authorization* using a custom `groupClaim`.

## Commonly used `@auth` rule patterns

### Owner Based Authorization

The following are commonly used patterns for owner based authorization.  For more information on how to tune these examples, please see the [CLI documentation on owner based authorization](~/cli/graphql-transformer/auth.md#owner-authorization).

* Create/Read/Update/Delete mutations are private to the owner.
```graphql
type YourModel @model @auth(rules: [{ allow: owner }]) {
  ...
}
```

* Owners can create & delete; others can update and read.
```graphql
type YourModel @model @auth(rules: [{ allow: owner,
                                   operations: [create, delete]}]) {
  ...
}
```

### Static Group Authorization
The following are commonly used patterns for static group authorization.  For more information on how to tune these examples, please see the [CLI documentation on static group authorization](~/cli/graphql-transformer/auth.md#static-group-authorization).

* Users belonging to the "Admin" group can CRUD (create, read, update, and delete), others can not access anything.
```graphql
type YourModel @model @auth(rules: [{ allow: groups,
                                      groups: ["Admin"] }]) {
  ...
}
```

* Users belonging to the "Admin" group can CRUD, others query and update.
```graphql
type YourModel @model @auth(rules: [{ allow: groups,
                                       groups: ["Admin"],
                                   operations: [create, delete] }]) {
  ...
}
```

### Owner and Static Group Combined
The following are commonly used patterns for combining owner and static group authorization.  For more information on how to tune these examples, please see the [CLI documentation on static group authorization](~/cli/graphql-transformer/auth.md#static-group-authorization).

* Users have their own data, but users who belong to the `Admin` group have access to their data and anyone else in that group.  Users in the `Admin` group have the ability to make mutation on behalf of users not in the `Admin` group
```graphql
type YourModel @model @auth(rules: [{ allow: owner },
                                      { allow: groups, groups: ["Admin"]}]) {
  ...
}
```

### Public Authorization
The following are commonly used patterns for public CRUD authorization.  For more information on how to tune these examples, please see the [CLI documentation on static group authorization](~/cli/graphql-transformer/auth.md#static-group-authorization#public-authorization).

* Auth provider is API Key, and all data is public CRUD
```graphql
type YourModel @model @auth(rules: [{ allow: public }]) {
  ...
}
```

* Auth provider is IAM, and all data is public CRUD
```graphql
type YourModel @model @auth(rules: [{ allow: public, provider: iam }]) {
  ...
}
```

### Private Authorization
The following are commonly used patterns for private authorization. For more information on how to tune these examples, please see the [CLI documentation on static group authorization](~/cli/graphql-transformer/auth.md#static-group-authorization#private-authorization).

* Cognito user pool authenticated users can CRUD all posts, regardless of who created it. Guest users do not have access.
```graphql
type YourModel @model @auth(rules: [{ allow: private }]) {
  ...
}
```
* IAM authenticated users can CRUD all posts, regardless of who created it. Guest users do not have access:
```graphql
type YourModel @model @auth(rules: [{ allow: private, provider: iam }]) {
  ...
}
```

### Owner based Authorization with OIDC provider
The following are commonly used patterns for owner based authorization using a 3rd party OIDC provider (e.g. Facebook, Google, etc...). For more information on how to tune these examples, please see the [Authorization using an oidc provider](~/cli/graphql-transformer/auth.md#authorization-using-an-oidc-provider).

* Using a 3rd party OIDC provider to achieve owner based authorization.
```graphql
type YourModel @model @auth(rules: [{ allow: owner,
                                     provider: oidc,
                                identityClaim: "sub" }]) {
  ...
}
```

<inline-fragment platform="android" src="~/lib/datastore/fragments/android/setup-auth-rules/owner_based_auth_oidc.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/setup-auth-rules/owner_based_auth_oidc.md"></inline-fragment>

### Static Group Authorization with OIDC provider
The following are commonly used patterns for using `groupClaims` to achieve group based authorization using a 3rd party OIDC provider. For more information on how to tune these examples, please see the [CLI documentation on static group authorization](~/cli/graphql-transformer/auth.md#custom-claims).

* Using a custom value for `groupClaim` to achieve static group authorization with a 3rd party OIDC provider.
```graphql
type YourModel @model @auth(rules: [{ allow: groups
                                     provider: oidc
                                       groups: ["Admin"]
                                   groupClaim: "https://myapp.com/claims/groups"
                                      }]) {
  ...
}
```

## Configure Multiple Authorization Types

For some use cases, you will want DataStore to use multiple authorization types. For example, an app might use `API Key` for public content and `Cognito User Pool` for personalized content once the user logs in.

By default, DataStore uses your API's default authorization type specified in the `amplifyconfiguration.json`/`aws-exports.js` file. To change the default authorization type, run `amplify update api`. Every network request sent through DataStore uses that authorization type, regardless of the model's `@auth` rule. 

To enable DataStore to use multiple authorization types based on the model's `@auth` rules, configure the "auth mode strategy" when initializing DataStore:

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/setup-auth-rules/10_multiauth-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/setup-auth-rules/10_multiauth-snippet.md"></inline-fragment>
<inline-fragment platform="js" src="~/lib/datastore/fragments/js/setup-auth-rules/10_multiauth-snippet.md"></inline-fragment>

This configuration enables DataStore to synchronize data using the model's `@auth` rule provider for each model.

### Multiple authorization types priority order

If there are multiple `@auth` rules on a model, the rules will be ranked by priority (see below), and DataStore will attempt the synchronization with each authorization type until one succeeds (or they all fail).

| Priority | `allow`: AuthStrategy | `provider` |
|:----------|:-----:|:------:|
| 1 | `owner` | `userPools` |
| 2 | `owner` | `oidc` |
| 3 | `group` | `userPools` |
| 4 | `group` | `oidc` |
| 5 | `private` | `userPools` |
| 6 | `private` | `iam` |
| 7 | `public` | `iam` |
| 8 | `public` | `apiKey` |

If there is **not** an authenticated user session, DataStore will only attempt `public` rules.

If a model has no auth rules defined, DataStore will continue to use the default authorization type from `amplifyconfiguration.json`.

####  Example with multiple authorization types

```graphql
type YourModel
  @model
  @auth(
		rules: [
			{ allow: owner }
			{ allow: public, provider: apiKey, operations: [read] }
		]
	) {
  ...
}
```
DataStore will attempt to use owner-based authorization first when synchronizing data if there is an authenticated user. If that request fails for some reason, DataStore will attempt the request again with public authorization. If there is **no** authenticated user, public authorization will be used.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/setup-auth-rules/20_function-auth-snippet.md"></inline-fragment>