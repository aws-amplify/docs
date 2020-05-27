The `Amplify/Tools` pod can be used to generate the models from the `schema.graphql` and automatically add the new files to the project.

1. **Update the amplifytools.xcconfig file** and change `modelgen=false` to:
    ```
    modelgen=true
    ```
2. **Build the project (`Cmd+b`)**. Doing a build will invoke the Amplify tools script to generate the model files, and automatically add them to your project in a group called “AmplifyModels”.
