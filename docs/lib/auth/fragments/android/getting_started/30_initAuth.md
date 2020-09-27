Add the Auth plugin along with any other plugins you added per the instructions in the **Prerequisites** section:

<amplify-block-switcher>
<amplify-block name="Java">
  
```java
// Add this line, to include the Auth plugin.
Amplify.addPlugin(new AWSCognitoAuthPlugin());
Amplify.configure(getApplicationContext());
```

</amplify-block>
<amplify-block name="Kotlin">

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
