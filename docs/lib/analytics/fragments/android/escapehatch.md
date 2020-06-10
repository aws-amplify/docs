
For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSPinpointAnalyticsPlugin plugin = (AWSPinpointAnalyticsPlugin) Amplify
        .Analytics
        .getPlugin("amazonPinpointAnalyticsPlugin");
AnalyticsClient analyticsClient = plugin.getEscapeHatch();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val plugin: AWSPinpointAnalyticsPlugin = Amplify.Analytics
        .getPlugin("amazonPinpointAnalyticsPlugin") as AWSPinpointAnalyticsPlugin
val analyticsClient: AnalyticsClient? = plugin.getEscapeHatch()
```

</amplify-block>
</amplify-block-switcher>