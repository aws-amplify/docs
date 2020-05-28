If you have chosen you use the Amplify/Tools pod, we will now use it to generate the models from the schema defined in schema.graphql and automatically add the new files to the project. If you have chosen to use the Amplify CLI instead, please skip this section, and follow the [Code generation: Amplify CLI](#code-generation-amplify-cli) section.

1. **Update the amplifytools.xcconfig file** and change `modelgen=false` to:
    ```
    modelgen=true
    ```
2. **Build the project (`Cmd+b`)**. Doing a build will invoke the Amplify tools script to generate the model files, and automatically add them to your project.

Once the build is done, a new group named "AmplifyConfig" should be added to your project and contain the following files:

- `AmplifyModels/`
  - `AmplifyModels.swift`
  - `Todo.swift`
  - `Todo+Schema.swift`

<amplify-callout warning>

**Troubleshooting:** note that when new files are added to your project during an ongoing build, Xcode might cancel the build or leave it in an error state. If that happens you can just build again (`Cmd+b`) re-issue a build for the updated project.

</amplify-callout>
