**Amplify Flutter and Null Safety**


The Amplify Flutter library supports [Dart null safety](https://dart.dev/null-safety) beginning with version 0.2.0.  This means that:

* Applications utilizing [sound null safety](https://dart.dev/null-safety) must use Amplify Flutter version 0.2.0 or greater.

* Applications utilizing [unsound null safety](https://dart.dev/null-safety/unsound-null-safety) can use versions of Amplify Flutter above or below 0.2.0, but some application changes may be necessary to migrate to 0.2.0.

* Applications that are not null safe must use a version of Amplify Flutter under 0.2.0.


**Using Generated Codegen Models with Null Safety**


The Amplify CLI's `codegen models` command can generate Dart models with or without null safety. To generate null safe models, make sure that the `pubspec.yaml` file at the root of your projects defines a Dart SDK version of 2.12.0 or greater, and make sure that the `enableDartNullSafety` [feature flag](https://docs.amplify.aws/cli/reference/feature-flags) is set to true.

In order to migrate to Amplify Flutter version 0.2.0 or greater, you will need to regenerate your codegen models with null safety if you are using them.