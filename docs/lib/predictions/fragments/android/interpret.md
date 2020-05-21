The following API allows you to analyze text for language, entities (places, people), key phrases, sentiment (positive, neutral, negative), and syntax (pronouns, verbs, adjectives).

## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below (Use arrow keys)
  Identify
  Convert
❯ Interpret
  Infer
  Learn More

? What would you like to interpret? (Use arrow keys)
❯ Interpret Text

? Provide a friendly name for your resource
  <Enter a friendly name here>

? What kind of interpretation would you like? (Use arrow keys)
  Language
  Entity
  Keyphrase
  Sentiment
  Syntax
❯ All

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users
```

Run `amplify push` to create the resources in the cloud

## Working with the API

Here is an example of sending text for interpretation such as sentiment analysis or natural language characteristics.

```java
    public void interpret(String text) {
        Amplify.Predictions.interpret(
                text,
                result -> Log.i("AmplifyQuickstart", result.toString()),
                error -> Log.e("AmplifyQuickstart", error.toString(), error)
        );
    }
```
