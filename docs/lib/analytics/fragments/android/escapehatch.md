<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 03e0e575... moving analytics escape hatch to its own section
=======
>>>>>>> 8818ca91... minor fixes
For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSPinpointAnalyticsPlugin plugin = (AWSPinpointAnalyticsPlugin) Amplify
        .Analytics
<<<<<<< HEAD
        .getPlugin("awsPinpointAnalyticsPlugin");
=======
        .getPlugin("amazonPinpointAnalyticsPlugin");
>>>>>>> 03e0e575... moving analytics escape hatch to its own section
AnalyticsClient analyticsClient = plugin.getEscapeHatch();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val plugin: AWSPinpointAnalyticsPlugin = Amplify.Analytics
<<<<<<< HEAD
        .getPlugin("awsPinpointAnalyticsPlugin") as AWSPinpointAnalyticsPlugin
=======
        .getPlugin("amazonPinpointAnalyticsPlugin") as AWSPinpointAnalyticsPlugin
>>>>>>> 03e0e575... moving analytics escape hatch to its own section
val analyticsClient: AnalyticsClient? = plugin.getEscapeHatch()
```

</amplify-block>
</amplify-block-switcher>