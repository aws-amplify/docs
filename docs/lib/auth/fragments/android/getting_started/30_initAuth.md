Add the Auth plugin before calling `Amplify.configure`. Update [the code you added](~/lib/project-setup/create-application.md#n4-initialize-amplify-in-the-application) in **Prerequisites**: 

<amplify-block-switcher>
<amplify-block name="Java">
  
```java
// Add this line, to include the Auth plugin.
Amplify.addPlugin(new AWSCognitoAuthPlugin());
Amplify.configure(getApplicationContext());
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
// Add this line, to include the Auth plugin.
Amplify.addPlugin(AWSCognitoAuthPlugin())
Amplify.configure(applicationContext)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
// Add this line, to include the Auth plugin.
Amplify.addPlugin(AWSCognitoAuthPlugin())
Amplify.configure(applicationContext)
```

</amplify-block>
<amplify-block name="RxJava">

```java
// Add this line, to include the Auth plugin.
RxAmplify.addPlugin(new AWSCognitoAuthPlugin());
RxAmplify.configure(getApplicationContext());
```

</amplify-block>
</amplify-block-switcher>
