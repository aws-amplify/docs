For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the AWSS3 instance.

After the `Amplify.configure` call put these two lines:

```java
    AmazonS3Client client = ((AWSS3StoragePlugin) Amplify.Storage.getPlugin("awsS3StoragePlugin")).getEscapeHatch();
    Log.i("StorageQuickStart", client.getRegionName());
```
