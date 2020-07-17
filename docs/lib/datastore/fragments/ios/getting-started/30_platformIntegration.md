The `Amplify/Tools` pod provides an integration layer between the Amplify CLI headless mode (i.e. no AWS credentials needed) and Xcode. It integrates into the build process of the IDE to provide a seamless experience.

First add the pod to your `Podfile`.

```ruby
pod 'Amplify/Tools'
```

Then **add a Build Phase** to your app target.

1. Click on the **Todo project** in the project workspace, then click the **Todo** app target, and then **click on `Build Phases`**.
2. Tap the `+` button to add another phase, and **select "New Run Script Phase"**
3. Drag the new `Run Script` phase to move the phase so that it runs prior to the `Compile Sources` phase.
4. Update the `Run Script` build phase title to **"Run Amplify Tools"**, and then update the shell script to have a single line with:
  ```bash
  "${PODS_ROOT}/AmplifyTools/amplify-tools.sh"
  ```
5.  Now that Amplify tools  is added to the build process, it will run when you build you project.  **Build your project** in Xcode (`Cmd+b`).

Once the build is done, a new group named `AmplifyConfig` should be added to your project and contain the following files:

- `AmplifyConfig/`
  - `amplifytools.xcconfig`
  - `amplifyconfiguration.json`
  - `schema.graphql`

<amplify-callout warning>

**Troubleshooting:** Xcode sometimes interrupts the build when new files are added to the project while the build is still in progress. Triggering a new build with (`Cmd+b`) fixes the issue.

</amplify-callout>
