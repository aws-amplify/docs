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
❯ Identify Entities
  Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users
```
Run `amplify push` to create the resources in the cloud.

## Working with the API

### Detect entities in an image

To detect general entities like facial features, landmarks etc, default configuration from CLI workflow will suffice (i.e. celebrity detection enabled & entity identification from collection disabled).

Amplify will now detect general entity features when `IdentifyActionType.DETECT_ENTITIES` is passed in. Results are mapped to `IdentifyEntitiesResult`. For example:

```java
public void detectEntities(Bitmap image) {
    Amplify.Predictions.identify(
            IdentifyActionType.DETECT_ENTITIES,
            image,
            result -> {
                IdentifyEntitiesResult identifyResult = (IdentifyEntitiesResult) result;
                EntityDetails metadata = identifyResult.getEntities().get(0);
                Log.i("PredictionsQuickstart", metadata.getBox().toShortString());
            },
            error -> Log.e("PredictionsQuickstart", error.toString(), error)
    );
}
```
As a result of passing in an image, the bounding box ([`android.graphics.RectF`](https://developer.android.com/reference/android/graphics/RectF)) that captures detected entity will be printed to the console.

**Note**: Bounding boxes for entities are returned as ratios, so make sure to properly scale it before using it.

### Detect pre-determined entities in an image

In order to match entities from a pre-created [Amazon Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/collections.html), ensure that both `collectionId` and `maxEntities` are set in your `amplifyconfiguration.json` file. The value of `collectionId` should be the name of your collection that you created either with the CLI or the SDK. The value of `maxEntities` should be a number greater than `0` or less than `51` (50 is the max number of entities Rekognition can detect from a collection). If both `collectionId` and `maxEntities` do not have valid values in the `amplifyconfiguration.json` file, then this call will just detect entities in general with facial features, landmarks, etc.

To identify entities by matching against a collection of images, Amplify must be re-configured as following:

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
❯ Identify Entities
  Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you like use the default configuration? (Use arrow keys)
  Default Configuration
❯ Advanced Configuration

? Would you like to enable celebrity detection? (Y/n)
  <Enter 'y'>

? Would you like to identify entities from a collection of images? (y/N)
  <Enter 'y'>

? How many entities would you like to identify? (50)
  1

? Would you like to allow users to add images to this collection? (Use arrow keys)
❯ Yes
  No

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users
```
Run `amplify push` to create the resources in the cloud

**Note**: Only one mode of entity detection can be used per app. If entity detection was already configured to default settings, then CLI will forbid you from adding another resource for identifying entities. In that case, run `amplify update predictions`, select the corresponding resource, and then re-configure it as necessary.

If properly configured with `collectionId` and `maxEntities`, then Amplify will detect entity matches from the Rekogition Collection in your app. Results are mapped to `IdentifyEntityMatchesResult`. For example:

```java
public void detectEntities(Bitmap image) {
    Amplify.Predictions.identify(
            IdentifyActionType.DETECT_ENTITIES,
            image,
            result -> {
                IdentifyEntityMatchesResult identifyResult = (IdentifyEntityMatchesResult) result;
                EntityMatch match = identifyResult.getEntityMatches().get(0);
                Log.i("PredictionsQuickstart", match.getExternalImageId());
            },
            error -> Log.e("PredictionsQuickstart", error.toString(), error)
    );
}
```
