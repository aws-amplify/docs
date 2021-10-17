<amplify-callout>

DataStore multi-authorization is currently unsupported in Flutter. We are actively working on this.

Please follow this [Github issue](https://github.com/aws-amplify/amplify-flutter/issues/815) to track this missing feature.

</amplify-callout>
<!-- ```dart 
try {
  await Amplify.addPlugin(AmplifyAuthCognito());
  await Amplify.addPlugin(AmplifyAPI());
  await Amplify.addPlugin(AmplifyDataStore(
    modelProvider: ModelProvider.instance,
    authModeStrategy: AuthModeStrategy.multiAuth,
  ));
  await Amplify.configure(amplifyconfig);
  print('Initialized Amplify');
} catch (e) {
  print('Could not initialize Amplify: $e');
}
``` -->
