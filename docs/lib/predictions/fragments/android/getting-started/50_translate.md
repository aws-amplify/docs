<amplify-block-switcher>
<amplify-block name="Java">

Open `MainActivity.java` and add the following to the bottom of `onCreate()`:

```java
Amplify.Predictions.translateText(
        "I like to eat spaghetti",
        LanguageType.ENGLISH,
        LanguageType.SPANISH,
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
    LanguageType.SPANISH,
    { result -> Log.i("MyAmplifyApp", result.getTranslatedText()) },
    { error -> Log.e("MyAmplifyApp", "Translation failed", error) }
)
```

</amplify-block>
</amplify-block-switcher>

Next, build and run the application.
