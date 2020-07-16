Add the following code to your app:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.addPlugin(new AWSCognitoAuthPlugin());
Amplify.addPlugin(new AWSApiPlugin());
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.addPlugin(AWSCognitoAuthPlugin())
Amplify.addPlugin(AWSApiPlugin())
```

</amplify-block>
</amplify-block-switcher>
