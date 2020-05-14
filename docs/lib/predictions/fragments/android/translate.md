## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below
  Identify
❯ Convert
  Interpret
  Infer
  Learn More

? What would you like to convert? (Use arrow keys)
❯ Translate text into a different language
  Generate speech audio from text
  Transcribe text from audio

? Provide a friendly name for your resource
  <Enter a friendly name here>

? What is the source language? (Use arrow keys)
  <Select your default source language>

? What is the target language? (Use arrow keys)
  <Select your default target language>

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users

```

Run `amplify push` to create the resources in the cloud

## Working with the API

### Translate text as configured

Here is an example of translating text.

```java
public void translate(String text) {
    Amplify.Predictions.translateText(
            text,
            result -> Log.i("PredictionsQuickstart", result.getTranslatedText()),
            error -> Log.e("PredictionsQuickstart", error.toString())
    );
}
```
As a result of running this code, you will see the translated text printed to the console.

### Override configured language

In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

```java
public void translate(String text) {
    Amplify.Predictions.translateText(
            text,
            LanguageType.ENGLISH,
            LanguageType.ITALIAN,
            result -> Log.i("PredictionsQuickstart", result.getTranslatedText()),
            error -> Log.e("PredictionsQuickstart", error.toString())
    );
}
```
