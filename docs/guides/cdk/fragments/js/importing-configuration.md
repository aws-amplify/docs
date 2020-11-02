### Importing the configuration files

You can now consume both Amplify & CDK configuration files to implement the client-side configuration needed for the Amplify libraries.

```js
import Amplify from "aws-amplify";
import { YourStackName } from "./cdk-exports";
import config from "./aws-exports";
Amplify.configure({
  ...config, ...YourStackName
});
```