The `amplify-app` utility provides an integration layer between the Amplify CLI and Xcode.

First make sure you have the latest version installed:

```bash
npm install -g amplify-app
```

Then **run the command** to create the Amplify app structure and automatically add the necessary files to Xcode:

```bash
amplify-app --platform ios
```

Once the command is done, a new group named `AmplifyConfig` should be added to your project and contain the following files:

- `AmplifyConfig/`
  - `amplifyconfiguration.json`
  - `awsconfiguration.json`
  - `schema.graphql`
