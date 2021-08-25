Models can also be generated using the Amplify CLI directly.

In your terminal, make sure you are in your project/root folder and **execute the codegen command**:

```console
amplify codegen models
```

You can **find the generated files** at `amplify/generated/models/`.

<amplify-callout>

Codegen generates models using Dart null safety by default for a new Flutter project. It also provides a configurable feature flag to generate null safe models for existing Flutter projects. Check [here](~/lib/project-setup/null-safety.md/q/platform/flutter) for more details.

</amplify-callout>
