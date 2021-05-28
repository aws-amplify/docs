Models can also be generated using the Amplify CLI directly.

In your terminal, make sure you are in your project/root folder and **execute the codegen command**:

```console
amplify codegen models
```

You can **find the generated files** at `amplify/generated/models/`.

<amplify-callout warning>

If you are using Flutter (2.2.0 or greater), you need to add a language version comment `// @dart=2.9` to the top of each generated Dart file to disable sound null safety. Check [here](https://dart.dev/null-safety/unsound-null-safety#testing-or-running-mixed-version-programs) for more details. Null safety support for Amplify Flutter is being worked on actively.

</amplify-callout>
