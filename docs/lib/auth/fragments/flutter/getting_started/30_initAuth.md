Add the desired Auth plugin along with any other plugins you added per the instructions in the **Prerequisites** section.  Currently, the only officially supported auth plugin is amplify-auth-cognito.

<amplify-block-switcher>
  <amplify-block name="Dart">
  
```dart
    // Add this line, to include the Auth plugin.
      AmplifyAuthCognito auth = new AmplifyAuthCognito();
      amplify.addPlugin([auth]);
```

  </amplify-block>

</amplify-block-switcher>