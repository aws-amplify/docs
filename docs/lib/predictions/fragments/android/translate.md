## Set up the backend

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below
  `Convert`
? What would you like to convert? (Use arrow keys)
 `Translate text into a different language`
? Provide a friendly name for your resource
  translate
? What is the source language? (Use arrow keys)
  `US English`
? What is the target language? (Use arrow keys)
  `Italian`
? Who should have access? (Use arrow keys)
  `Auth and Guest users`
```

Run `amplify push` to create the resources in the cloud.

## Working with the API

### Translate text as configured

<amplify-block-switcher>
<amplify-block name="Java">

Open `MainActivity.java` and add the following to the bottom of `onCreate()`:

```java
Amplify.Predictions.translateText(
        "I like to eat spaghetti",
        result -> Log.i("MyAmplifyApp", result.getTranslatedText()),
        error -> Log.e("MyAmplifyApp", "Translation failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

Open `MainActivity.kt` and add the following to the bottom of `onCreate()`:

```kotlin
Amplify.Predictions.translateText(
    "I like to eat spaghetti",
    { result -> Log.i("MyAmplifyApp", result.getTranslatedText()) },
    { error -> Log.e("MyAmplifyApp", "Translation failed", error) }
)
```

</amplify-block>
</amplify-block-switcher>

As a result of running this code, you will see the translated text printed to the console.

```console
I/MyAmplifyApp: Mi piace mangiare gli spaghetti
```

### Override configured language

In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

Add the `LanguageType` options as below:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Predictions.translateText(
        "I like to eat spaghetti",
        LanguageType.ENGLISH,
        LanguageType.RUSSIAN,
        result -> Log.i("MyAmplifyApp", result.getTranslatedText()),
        error -> Log.e("MyAmplifyApp", "Translation failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

Open `MainActivity.kt` and add the following to the bottom of `onCreate()`:

```kotlin
Amplify.Predictions.translateText(
    "I like to eat spaghetti",
    LanguageType.ENGLISH,
    LanguageType.RUSSIAN,
    { result -> Log.i("MyAmplifyApp", result.getTranslatedText()) },
    { error -> Log.e("MyAmplifyApp", "Translation failed", error) }
)
```

</amplify-block>
</amplify-block-switcher>

As a result of running this code, you will see the translated text printed to the console.

```console
I/MyAmplifyApp: Мне нравится есть спагетти
```
