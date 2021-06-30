**Amplify Flutter and Null Safety**


The Amplify Flutter library supports [Dart null safety](https://dart.dev/null-safety) beginning with version 0.2.0.  

|                                	                     | amplify-flutter 0.1.6 and below   	| amplify-flutter 0.2.0 and above  	|
|-------------------------------	|---------------------------------	|---------------------------------	|
| Null Safe App     	                         | Not Supported                             	| Supported                                    	|
| Non Null Safe App w/ flutter v2  | Supported                                    	| Supported                                    	|
| Non Null Safe App w/ flutter v1 	| Supported                                    	| Not Supported                                    	|



**Using Generated Codegen Models with Null Safety**


The Amplify CLI's `codegen models` command can generate Dart models with or without null safety. To generate null safe models, make sure that the `pubspec.yaml` file at the root of your projects defines a Dart SDK version of 2.12.0 or greater, and make sure that the `enableDartNullSafety` [feature flag](https://docs.amplify.aws/cli/reference/feature-flags) is set to true in your `amplify/cli.json` file.

 If your app uses generated models from amplify, you will need to migrate these models to be null safe as part of migrating your app to be null safe. You should follow the [flutter null safety migration docs](https://dart.dev/null-safety/migration-guide) to migrate your application code, excluding the generated models. To migrate the models to be null safe, you can simply regenerate them following the instructions above.