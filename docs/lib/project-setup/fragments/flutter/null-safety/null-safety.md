**Amplify Flutter and Null Safety**


The Amplify Flutter library supports [Dart null safety](https://dart.dev/null-safety) starting with version 0.2.0.  

|                                	                     | amplify-flutter 0.1.x   	| amplify-flutter 0.2.x  	|
|-------------------------------	|---------------------------------	|---------------------------------	|
| Null Safe App     	                         | Not Supported                             	| Supported                                    	|
| Non Null Safe App w/ flutter v2  | Supported                                    	| Supported                                    	|
| Non Null Safe App w/ flutter v1 	| Supported                                    	| Not Supported                                    	|



**DataStore with Code Generated Models and Null Safety**


The latest version of the Amplify CLI can generate Dart models with or without null safety using the `amplify codegen models` command. 

***Opting-in to Null Safety***

If you have a null safe app, or are migrating to null safety and your app uses generated models from amplify, you will need ensure the models are null safe as well. You should follow the [flutter null safety migration docs](https://dart.dev/null-safety/migration-guide) to migrate your application code, excluding the generated models. 

To migrate to null safe models, you can simply regenerate them following the instructions:
1. Make sure that the `pubspec.yaml` file at the root of your projects defines a Dart SDK version of 2.12.0 or greater.
2. Update your Amplify CLI to version 5.1.0 or higher.  
```js
npm install -g @aws-amplify/cli
```
4. Make sure that the `enableDartNullSafety` [feature flag](https://docs.amplify.aws/cli/reference/feature-flags) is set to "true" in your `amplify/cli.json` file. 
5. Re-run `amplify codegen models` for your schema.

***Opting-out of Null Safety***

If you wish to continue using non-null safe models:
1. Make sure that the `enableDartNullSafety` [feature flag](https://docs.amplify.aws/cli/reference/feature-flags) is set to "false".
2. Re-run `amplify codegen models` for your schema 
