The `@auth` directive can be used to describe the authorization configuration parameters for each of the models.

The following is a high level overview of the various authorization scenarios we support in the Amplify libraries.  Each scenario has a variety of options you can tune to fit the needs of your application.  Use the links below to find out more information.

* [**Owner Based Authorization**](~/cli/graphql-transformer/auth.md#owner-authorization): Uses Cognito User Pools as an auth provider to add ownership and access rules to instances of your model
* [**Static Group Authorization**](~/cli/graphql-transformer/auth.md#static-group-authorization): Uses Cognito User Pools as an auth provider with groups to apply access rules to instances of your model
* [**Owner and Static Group Combined**](~/cli/graphql-transformer/auth.md#static-group-authorization): Uses a combination of both *Owner Based Authorization* and *Static Group Authorization* to control ownership and access.
* [**Public Authorization**](~/cli/graphql-transformer/auth.md#static-group-authorization#public-authorization): Use API Key or IAM to allow public access to your model instances
* [**Private Authorization**](~/cli/graphql-transformer/auth.md#static-group-authorization#private-authorization): Use IAM or Cognito User Pools to allow private access to your model instances
* [**Owner based Authorization with OIDC provider**](~/cli/graphql-transformer/auth.md#authorization-using-an-oidc-provider): Use a 3rd party OIDC Provider to achieve *Owner based authorization*
* [**Static Group Authorization with OIDC provider**](~/cli/graphql-transformer/auth.md#custom-claims): Use a 3rd party OIDC Provider to achieve *Static group authorization* using a custom `groupClaim`.
