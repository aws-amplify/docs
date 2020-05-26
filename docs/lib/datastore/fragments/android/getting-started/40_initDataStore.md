To initialize the Amplify Storage and Authentication categories, we are required to use the `Amplify.addPlugin()` method for each category we want.  When we are done calling `addPlugin()` on each category, we finish configuring Amplify by calling `Amplify.configure()`.


Add the following code to the bottom of your MainActivity `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
// TODO Java and Kotlin DataStore initialization code
```

Upon building and running this application you should see the following in your console window:

```bash
Amplify configured with storage plugin
```