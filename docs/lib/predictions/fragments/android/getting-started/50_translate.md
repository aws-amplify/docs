```java
Amplify.Predictions.translateText(
        "I like to eat spaghetti",
        LanguageType.ENGLISH,
        LanguageType.SPANISH,
        result -> Log.i("AmplifyQuickstart", result.getTranslatedText()),
        error -> Log.e("AmplifyQuickstart", error.toString())
);
```