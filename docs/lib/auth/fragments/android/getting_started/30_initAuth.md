Add the Auth plugin along with any other plugins you added per the instructions in the **Prerequisites** section:

<amplify-block-switcher>
  <amplify-block name="Java">
  
```java
    Amplify.addPlugin(new AWSCognitoAuthPlugin());
```

  </amplify-block>

  <amplify-block name="Kotlin">

```kotlin
    Amplify.addPlugin(AWSCognitoAuthPlugin())
```

  </amplify-block>
</amplify-block-switcher>
