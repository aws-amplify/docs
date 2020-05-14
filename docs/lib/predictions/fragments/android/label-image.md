## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below (Use arrow keys)
❯ Identify
  Convert
  Interpret
  Infer
  Learn More

? What would you like to identify? (Use arrow keys)
  Identify Text
  Identify Entities
❯ Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users  
```

The Advanced Configuration will allow you to select moderation for unsafe content or all of the identified labels. Default uses both.

Run `amplify push` to create the resources in the cloud

## Working with the API

### Label objects in an image

You can identify real world objects such as chairs, desks, etc. which are referred to as “labels” by passing in `LabelType.LABELS` as the identify action. For example:

```java
public void detectLabels(Bitmap image) {
    Amplify.Predictions.identify(
            LabelType.LABELS,
            image,
            result -> {
                IdentifyLabelsResult identifyResult = (IdentifyLabelsResult) result;
                Label label = identifyResult.getLabels().get(0);
                Log.i("PredictionsQuickstart", label.getName());
            },
            error -> Log.e("PredictionsQuickstart", error.toString(), error)
    );
}
```

**Note**: Do *NOT* pass `IdentifyActionType.DETECT_LABELS` as identify action. Pass in an instance of `LabelType` instead.

### Label moderation tag in an image

You can also detect whether identified content inside the image is safe by enabling moderation by passing in `LabelType.MODERATION_LABELS`.

```java
public void detectLabels(Bitmap image) {
    Amplify.Predictions.identify(
            LabelType.MODERATION_LABELS,
            image,
            result -> {
                IdentifyLabelsResult identifyResult = (IdentifyLabelsResult) result;
                Log.i("PredictionsQuickstart", Boolean.toString(identifyResult.isUnsafeContent()));
            },
            error -> Log.e("PredictionsQuickstart", error.toString(), error)
    );
}
```
