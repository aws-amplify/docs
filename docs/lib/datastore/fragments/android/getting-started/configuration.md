### Initialization

In your app's `onCreate` (or similar lifecycle callback), initialize Amplify:

```java
Amplify.addPlugin(new AWSDataStorePlugin());
Amplify.addPlugin(new AWSApiPlugin()); // If using remote model synchronization
Amplify.configure(getApplicationContext());
```

If you do not have any configuration file at `app/src/main/res/raw/amplifyconfiguration.json`, create a placeholder for now. For more information about this file, see the configuration section of this guide.

```json
{
  "userAgent": "aws-amplify-cli/2.0",
  "version": "1.0"
}
```
