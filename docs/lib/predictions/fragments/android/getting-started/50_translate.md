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
<amplify-block name="Kotlin - Callbacks">

Open `MainActivity.kt` and add the following to the bottom of `onCreate()`:

```kotlin
Amplify.Predictions.translateText(
    "I like to eat spaghetti", LanguageType.ENGLISH, LanguageType.SPANISH,
    { Log.i("MyAmplifyApp", it.translatedText) }
    { Log.e("MyAmplifyApp", "Translation failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

Open `MainActivity.kt` and add the following to the bottom of `onCreate()`:

```kotlin
val text = "I like to eat spaghetti"
try {
    val result = Amplify.Predictions.translateText(text, ENGLISH, SPANISH)
    Log.i("MyAmplifyApp", result.translatedText) 
} catch (error: PredictionsException) {
    Log.e("MyAmplifyApp", "Translation failed", error) 
}
```

</amplify-block>
<amplify-block name="RxJava">

Open `MainActivity.java` and add the following to the bottom of `onCreate()`:

```java
RxAmplify.Predictions.translateText(
        "I like to eat spaghetti",
        LanguageType.ENGLISH,
        LanguageType.SPANISH)
        .subscribe(
            result -> Log.i("MyAmplifyApp", result.getTranslatedText()),
            error -> Log.e("MyAmplifyApp", "Translation failed", error)
        );
```

</amplify-block>
</amplify-block-switcher>

Next, build and run the application.
