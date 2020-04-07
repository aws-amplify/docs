### Initialization

The main configuration required by DataStore is the *schema initialization*. When generating the models, the following files will be available to the application:

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
<br>

The most important piece to understand is how the DataStore is initialized. Inside `src/models/index.js` you will find a call to the `initSchema`. That function takes the schema defined in `src/models/schema.js`, initializes the storage mechanism and exports the models as JavaScript objects.

```js
import { Post } from './models';

// you can now use the Post model to save and query data
```
