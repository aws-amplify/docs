<a href="https://aws-amplify.github.io/" target="_blank">
    <img src="https://s3.amazonaws.com/aws-mobile-hub-images/aws-amplify-logo.png" alt="AWS Amplify" width="550" >
</a>

# AWS Amplify CLI codegen configuration & Workflow

The AWS Amplify CLI supports a rich workflow for Native application development on iOS or Android. Codegen helps you generate native code for iOS and android, generation of types for Flow and Typescript. It can also generates GraphQL statements(queries, mutations and subscriptions) so that user doesn't have to hand code them.

Codegen workflow gets executed automatically when an AppSync API is pushed to the cloud. The user get prompted if they want to configure codegen when an AppSync API is created and if they opt-in for codegen, subsequent pushes prompts users if they want to update the generated code after changes get pushed to cloud.

Codegen also supports AppSync APIs that are created using the AWS console, without the support of updating the AppSync API using cloud formation

## amplify add codegen
```
$ amplify add codgen [--apiId <api-id>]
```

The `amplify add codegen` command is a one-time intialization step, if you want to add already existing API to your project. If the `--apiId` parameter is missing, codgen adds projects AppSync API. It sets up the following
