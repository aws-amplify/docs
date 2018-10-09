<a href="https://aws-amplify.github.io/" target="_blank">
    <img src="https://s3.amazonaws.com/aws-mobile-hub-images/aws-amplify-logo.png" alt="AWS Amplify" width="550" >
</a>

# AWS Amplify CLI codegen configuration & Workflow

Codegen helps you generate native code for iOS and android, generation of types for Flow and Typescript. It can also generates GraphQL statements(queries, mutations and subscriptions) so that you doesn't have to hand code them.

Codegen `add` workflow triggers automatically when an AppSync API is pushed to the cloud. You will be prompted if you want to configure codegen when an AppSync API is created and if you opt-in for codegen, subsequent pushes prompts you if they want to update the generated code after changes get pushed to cloud.

When an project is configured to generate code with codegen, it stores all the configuration `.graphqlconfig.yml` file in the root folder of your project. Codegen behind the scene use [`amplify-graphql-docs-generator`](https://www.npmjs.com/package/amplify-graphql-docs-generator) to generate the GraphQL statements and [`aws-appsync-codegen`](https://www.npmjs.com/package/aws-appsync-codegen) to generate the types.

When generating types, codegen uses GraphQL statements as input. It will generates only the types that are being used in the GraphQL statements.


## amplify add codegen
```
$ amplify add codgen [--apiId <api-id>]
```

The `amplify add codegen` allows you to add AppSync API created using the AWS console. If you have your API is in a different region then that of your current region, the command asks you to choose the region

## amplify configure codegen
```
$ amplify configure codgen
```
The `amplify configure codegen` command allows you to update the codgen configuration after it is added to your project. 

## amplify codegen statements
The `amplify codegen statements [--nodownload]` command  generates GraphQL statements(queries, mutation and subscription) based on your GraphQL schema. This command downloads introspection schema everytime it is run but it can be forced to use previously downloaded introspection schema by passing `--nodownload` flag


## amplify codegen types
The `amplify codegen types [--nodownload]` command generates GraphQL `types` for Flow and typescript and Swift class in an iOS project. This command downloads introspection schema everytime it is run but it can be forced to use previously downloaded introspection schema by passing `--nodownload` flag

## amplify codegen
The `amplify codegen [--nodownload]` generates GraphQL `statements` and `types`. This command downloads introspection schema everytime it is run but it can be forced to use previously downloaded introspection schema by passing `--nodownload` flag









