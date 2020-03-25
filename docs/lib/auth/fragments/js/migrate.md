A use case for the `USER_PASSWORD_AUTH` authentication flow is migrating users into Amazon Cognito. Read more about this authentication workflow in the [overview](~/lib/auth/overview.md). 

## Setup auth backend

In order to use the authentication flow `USER_PASSWORD_AUTH`, your Cognito app client has to be configured to allow it. In the AWS Console, this is done by ticking the checkbox at General settings > App clients > Show Details (for the affected client) > Enable username-password (non-SRP) flow. If you're using the AWS CLI or CloudFormation, update your app client by adding `USER_PASSWORD_AUTH` to the list of "Explicit Auth Flows".

## Migrate users with Amazon Cognito

Amazon Cognito provides a trigger to migrate users from your existing user directory seamlessly into Cognito. You achieve this by configuring your User Pool's "Migration" trigger which invokes a Lambda function whenever a user that does not already exist in the user pool authenticates, or resets their password.

In short, the Lambda function will validate the user credentials against your existing user directory and return a response object containing the user attributes and status on success. An error message will be returned if an error occurs. There's a documentation [here](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-import-using-lambda.html) on how to set up this migration flow and more detailed instructions [here](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-migrate-user.html#cognito-user-pools-lambda-trigger-syntax-user-migration) on how the lambda should handle request and response objects.