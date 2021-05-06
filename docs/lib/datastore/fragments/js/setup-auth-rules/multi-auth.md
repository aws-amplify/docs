## Multiple Authorization Types

By default, DataStore will use the default authorization type, which is set as the `aws_appsync_authenticationType` key in your Amplify configuration, when synchronizing data with your AWS AppSync API. This means that every network request sent through DataStore will only use that authorization type, no matter what type of `@auth` rule exists on your models.

However, if you would like DataStore to infer what type of authorization to use for each model based on the `@auth` rules that exist on a model, you can enable **Multi-Auth** for DataStore by adding the following to your Amplify configuration:

```js
import Amplify, { AuthModeStrategyType } from 'aws-amplify';
import awsconfig from './aws-exports'; 

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})
```

With this configuration enabled, DataStore will attempt to synchronize data using the `@auth` rule provider for each model.

### Multi-Auth priority evaluation

If there are multiple rules on a model, the rules will be ranked by priority (see below), and DataStore will attempt the synchronization with each authorization type until one succeeds (or they all fail).

The priority will first be sorted by the `allow` property in the following order:
- `owner`
- `group`
- `private`
- `public`

If there are multiple rules with the same `allow` value, then the sorting is based on the `provider` property in the following order:
- `userPools`
- `oidc`
- `iam`
- `apiKey`

If there is **not** an authenticated user in your application, DataStore will only attempt `public` rules, meaning that `owner`, `group` and `private` rules will be disregarded in order to not waste network requests that we know will fail.

As a fallback, if there are no valid rules for a model, DataStore will attempt synchronization with the default authorization type.

#### Multi-Auth example

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
