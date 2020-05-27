The following APIs will enable you identify real world objects (chairs, desks, etc) in images.  These objects are referred to as "labels" from images.

## Set up your backend

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below (Use arrow keys)
  `Identify`
? What would you like to identify? (Use arrow keys)
  `Identify Labels`
? Provide a friendly name for your resource
  `labelObjects`
? Would you like use the default configuration? (Use arrow keys)
  `Default Configuration`
? Who should have access? (Use arrow keys)
  `Auth and Guest users`
```

The Advanced Configuration will allow you to select moderation for unsafe content or all of the identified labels. Default uses both.

Run `amplify push` to create the resources in the cloud.

## Working with the API

### Label objects in an image

You can identify real world objects such as chairs, desks, etc. which are referred to as “labels” by passing in `LabelType.LABELS` as the identify action. For example:

<amplify-block-switcher>
<amplify-block name="Java">

```java
public void detectLabels(Bitmap image) {
    Amplify.Predictions.identify(
            LabelType.LABELS,
            image,
            result -> {
                IdentifyLabelsResult identifyResult = (IdentifyLabelsResult) result;
                Label label = identifyResult.getLabels().get(0);
                Log.i("MyAmplifyApp", label.getName());
            },
            error -> Log.e("MyAmplifyApp", "Label detection failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun detectLabels(image: Bitmap) {
    Amplify.Predictions.identify(
        LabelType.LABELS,
        image,
        Consumer { result: IdentifyResult ->
            val identifyResult = result as IdentifyLabelsResult
            val label: Label = identifyResult.getLabels()[0]
            Log.i("MyAmplifyApp", label.getName())
        },
        Consumer { error: PredictionsException ->
            Log.e("MyAmplifyApp", "Label detection failed", error)
        }
    )
}
```

</amplify-block>
</amplify-block-switcher>

### Label moderation tag in an image

You can also detect whether identified content inside the image is safe by enabling moderation by passing in `LabelType.MODERATION_LABELS`.

<amplify-block-switcher>
<amplify-block name="Java">

```java
public void detectLabels(Bitmap image) {
    Amplify.Predictions.identify(
            LabelType.MODERATION_LABELS,
            image,
            result -> {
                IdentifyLabelsResult identifyResult = (IdentifyLabelsResult) result;
                Log.i("MyAmplifyApp", Boolean.toString(identifyResult.isUnsafeContent()));
            },
            error -> Log.e("MyAmplifyApp", "Identify failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun detectLabels(image: Bitmap) {
    Amplify.Predictions.identify(
        LabelType.MODERATION_LABELS,
        image,
        Consumer { result: IdentifyResult ->
            val identifyResult = result as IdentifyLabelsResult
            Log.i("MyAmplifyApp", identifyResult.isUnsafeContent.toString())
        },
        Consumer { error: PredictionsException ->
            Log.e("MyAmplifyApp", "Identify failed", error)
        }
    )
}
```

</amplify-block>
</amplify-block-switcher>
