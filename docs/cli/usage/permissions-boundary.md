---
title: IAM Role Permissions Boundary
description: Apply a Permissions Boundary to all IAM Roles created by Amplify CLI.
---

To set the maximum permissions that can be granted to IAM Roles created by Amplify CLI, a [Permissions Boundary](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) can be configured for the project. This can be used to ensure that IAM Roles created by Amplify CLI never have access to certain services or resources. Additionally, a different Permissions Boundary can be specified for each Amplify environment to allow or deny access depending on the environment. This enables use cases such as denying a dev account all access to a prod account to ensure no prod changes are inadvertently made.

The IAM Permissions Boundary will apply to ALL IAM Roles created by Amplify. This includes the auth role assumed by users that log into the app and the unauth role assumed by guest users. It also applies to Lambda execution roles, Cognito user group roles, and any role configured in a custom resource stack.

Amplify CLI does not create an IAM Policy to use as a Permissions Boundary. This must be configured outside of the project (typically as part of an AWS Org rule or other enterprise rule). A Permissions Boundary is an IAM Policy and can be created following the guide [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html). Once you have created an IAM Policy to use as a Permissions Boundary, copy the IAM Policy ARN for the next steps.

## Configuring a Permissions Boundary
To initialize a project with a Permissions Boundary run `amplify init --permissions-boundary <IAM Policy ARN>`.

When creating a new Amplify environment using `amplify env add` the Permissions Boundary from the current environment is automatically applied to the new environment. To specify a different Permissions Boundary for the new environment, use `amplify env add --permissions-boundary <IAM Policy ARN>`. To explicitly specify that the new environment should NOT have a Permissions Boundary, use `amplify env add --permissions-boundary ''`. If Amplify CLI is not able to automatically apply the Permissions Boundary to the new environment and `--permissions-bounday` is not specified, it will prompt for a new value.

To modify the Permissions Boundary of the current environment run `amplify env update` and enter a new Permmissions Boundary when prompted. In non-interactive shells use `amplify env update --permissions-boundary <IAM Policy ARN>`.
The boundary will be updated on the next `amplify push`.

Specifying a Permissions Boundary is always optional except when the current environment has a Permissions Boundary and a new Amplify environment is added in a different AWS account using the `--yes` flag. In this case, Amplify CLI will not be able to automatically apply the existing boundary to the new environment and cannot prompt for a new value. In this case, a new Permissions Boundary must be specified using `amplify env add --yes --permissions-boundary <IAM Policy ARN>`. Or to explicity remove the Permissions Boundary from the new environment use `amplfiy env add --yes --permissions-boundary ''`.
