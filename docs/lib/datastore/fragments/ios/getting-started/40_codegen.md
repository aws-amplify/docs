On iOS the `amplify` CLI offers an Xcode integration that automatically adds the Amplify-specific files to your project.

1. **Run the command**:
    ```
    amplify codegen models
    ```

2. The `amplify codegen models` command adds a new `AmplifyModels` group to your Xcode project. It will contain the following files:

  - `AmplifyModels/`
    - `AmplifyModels.swift`
    - `Post.swift`
    - `Post+Schema.swift`
    - `PostStatus.swift`

1. **Build the project (`Cmd+b`)**.
