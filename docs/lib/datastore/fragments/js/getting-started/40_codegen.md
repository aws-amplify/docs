When using `npx amplify-app` a NPM script named `amplify-modelgen` should be added to you `package.json`. You can **generate model code** with the following command.

```console
npm run amplify-modelgen
```

The following files will be generated.

```
src/
|_ models/
   |_ index.d.ts
   |_ index.js
   |_ schema.d.ts
   |_ schema.js
```

<amplify-callout>

The `.d.ts` are [TypeScript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). If your project does not use TypeScript, do not worry, those files can still provide most editors a better developer experience, with a more accurate auto-complete and realtime type checking. Worst case scenario they will just be ignored.

</amplify-callout>
