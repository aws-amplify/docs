---
title: IAM Role Permission Boundary
description: Apply a Permission Boundary to all IAM Roles created by Amplify CLI.
---

To set the maximum permissions that can be granted to IAM Roles created by Amplify CLI, a [Permission Boundary](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) can be configured for the project.

Amplify CLI does not create an IAM Policy to use as a Permission Boundary. This must be configured outside of the project (typically as part of an AWS Org rule or other enterprise rule).
To configure the Permission Boundary for the project:
1. Run `amplify configure project`
2. Select `Advanced`
3. When prompted, enter the IAM Policy ARN for the Permission Boundary

On the next `amplify push` all IAM Roles in the project will be updated with the specified Permission Boundary.

Rerun the steps above to change the Permission Boundary at any time.