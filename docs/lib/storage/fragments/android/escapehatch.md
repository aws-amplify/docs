For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the `AmazonS3Client` instance:

<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSS3StoragePlugin plugin = (AWSS3StoragePlugin) Amplify.Storage.getPlugin("awsS3StoragePlugin");
AmazonS3Client client = plugin.getEscapeHatch();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val plugin = Amplify.Storage.getPlugin("awsS3StoragePlugin") as AWSS3StoragePlugin
val client = plugin.escapeHatch
```

</amplify-block>
</amplify-block-switcher>
