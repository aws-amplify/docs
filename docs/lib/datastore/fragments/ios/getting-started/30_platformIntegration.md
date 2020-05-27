The `Amplify/Tools` pod provides an integration layer between the Amplify CLI headless mode (i.e. no AWS credentials needed) and Xcode. It integrates into the build process of the IDE to provide a seamsless experience.

First add the pod to your `Podfile`.

```ruby
pod 'Amplify/Tools'
```

Then **add a Build Phase** to your app target.

1. Click on your project in the file list, choose your target under TARGETS, click the Build Phases tab.
2. Add a **New Run Script Phase** by clicking the little plus icon in the top left.
3. Drag the new Run Script phase **above the Compile Sources phase**, expand it and paste the following script:
    ```console
    "${PODS_ROOT}/AmplifyTools/amplify-tools.sh"
    ```
4. Build the project (`Cmd+b`)

Once the build is done, a new group named "AmplifyConfig" should be added to your project and contain the following files:

- `AmplifyConfig/`
  - `amplifytools.xcconfig`
  - `amplifyconfigutarion.json`
  - `schema.graphql`
