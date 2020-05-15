## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below (Use arrow keys)
❯ Identify
  Convert
  Interpret
  Infer
  Learn More

? What would you like to identify? (Use arrow keys)
  Identify Text
❯ Identify Entities
  Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users

```
Run `amplify push` to create the resources in the cloud

## Working with the API

```java
public void detectCelebs(Bitmap image) {
    Amplify.Predictions.identify(
            IdentifyActionType.DETECT_CELEBRITIES,
            image,
            result -> {
                IdentifyCelebritiesResult identifyResult = (IdentifyCelebritiesResult) result;
                CelebrityDetails metadata = identifyResult.getCelebrities().get(0);
                Log.i("AmplifyQuickstart", metadata.getCelebrity().getName());
            },
            error -> Log.e("AmplifyQuickstart", error.toString(), error)
    );
}
```
As a result of passing in an image, `identify` will return the name of a detected celebrity.
