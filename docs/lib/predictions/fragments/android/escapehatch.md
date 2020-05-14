If you need functionality in the AWS services used by the Amplify Predictions category that isn't available, we provide an escape hatch so you can get a reference to that service. For example, to get a reference to `AmazonRekognitionClient`:

```java
// Obtain reference to the plugin
final AWSPredictionsPlugin predictionsPlugin;
try {
    predictionsPlugin = (AWSPredictionsPlugin) Amplify.Predictions.getPlugin("awsPredictionsPlugin");
} catch (ClassCastException error) {
    Log.e("PredictionsQuickstart", "Unable to cast to AWSPredictionsPlugin");
    return;
}
AWSPredictionsEscapeHatch escapeHatch = predictionsPlugin.getEscapeHatch();

// Send a new request to the Rekognition endpoint directly using the client
AmazonRekognitionClient client = escapeHatch.getRekognitionClient();
CreateCollectionRequest request = new CreateCollectionRequest()
        .withCollectionId("<new-collection-id-here>");
client.createCollection(request);
```

In addition to `AmazonRekognitionClient`, this same pattern can be used to get access to `AmazonTranslateClient`, `AmazonPollyClient`, `AmazonComprehendClient`, and `AmazonTextractClient`. For example:

```java
// Obtain reference to the plugin
final AWSPredictionsPlugin predictionsPlugin;
try {
    predictionsPlugin = (AWSPredictionsPlugin) Amplify.Predictions.getPlugin("awsPredictionsPlugin");
} catch (ClassCastException error) {
    Log.e("PredictionsQuickstart", "Unable to cast to AWSPredictionsPlugin");
    return;
}
AWSPredictionsEscapeHatch escapeHatch = plugin.getEscapeHatch();

// Obtain a reference to each of the supported Amazon service clients
AmazonRekognitionClient rekognitionClient = escapeHatch.getRekognitionClient();
AmazonTranslateClient translateClient = escapeHatch.getTranslateClient();
AmazonPollyClient pollyClient = escapeHatch.getPollyClient();
AmazonComprehendClient comprehendClient = escapeHatch.getComprehendClient();
AmazonTextractClient textractClient = escapeHatch.getTextractClient();
```

**API Documentation Resources**
* [Amazon Rekognition API Reference](https://docs.aws.amazon.com/rekognition/latest/dg/API_Reference.html)
* [Amazon Translate API Reference](https://docs.aws.amazon.com/translate/latest/dg/API_Reference.html)
* [Amazon Polly API Reference](https://docs.aws.amazon.com/polly/latest/dg/API_Reference.html)
* [Amazon Comprehend API Reference](https://docs.aws.amazon.com/comprehend/latest/dg/API_Reference.html)
* [Amazon Textract API Reference](https://docs.aws.amazon.com/textract/latest/dg/API_Reference.html)
