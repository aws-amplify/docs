On iOS the aforementioned `amplify-app` offers an Xcode integration that automatically adds the Amplify-specific files to your project.

1. **Run the command**:
    ```
    amplify codegen models && amplify-app
    ```

1. Once the command finishes, a new group named `AmplifyModels` should be added to your project and contain the following files:

  - `AmplifyModels/`
    - `AmplifyModels.swift`
    - `Post.swift`
    - `Post+Schema.swift`
    - `PostStatus.swift`

1. **Build the project (`Cmd+b`)**.
