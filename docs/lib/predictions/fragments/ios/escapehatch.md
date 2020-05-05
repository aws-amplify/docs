If your application requires calling any of the AWS Services behind the predictions Category in a manner that we aren't doing on your behalf, we provide an escape hatch so you can get a reference to that service.  For example, to get a reference to `AWSRekognition`:

```swift
guard let predictionsPlugin = try Amplify.Predictions.getPlugin(for: "awsPredictionsPlugin") as? AWSPredictionsPlugin else {
    print("Unable to cast to AWSPredictionsPlugin")
    return
}

guard let rekognitionService = predictionsPlugin.getEscapeHatch(key: .rekognition) as? AWSRekognition else {
    print("Unable to get AWSRekognition")
    return
}

let request = AWSRekognitionCreateCollectionRequest()
if let request = request {
    rekognitionService.createCollection(request)
}
```

In addition to `AWSRekognition`, this same pattern can be used to get access to `AWSTranslate`, `AWSPolly`, `AWSTranscribeStreaming`, `AWSComprehend`, and `AWSTextract`.  For example:
```swift
guard let translateService = predictionsPlugin.getEscapeHatch(key: .translate) as? AWSTranslate else {
    print("Unable to get AWSTranslate")
    return
}

guard let pollyService = predictionsPlugin.getEscapeHatch(key: .polly) as? AWSPolly else {
    print("Unable to get AWSPolly")
    return
}

guard let transcribeService = predictionsPlugin.getEscapeHatch(key: .transcribe) as? AWSTranscribeStreaming else {
    print("Unable to get AWSTranscribeStreaming")
    return
}

guard let comprehendService = predictionsPlugin.getEscapeHatch(key: .comprehend) as? AWSComprehend else {
    print("Unable to get AWSComprehend")
    return
}

guard let textractService = predictionsPlugin.getEscapeHatch(key: .textract) as? AWSTextract else {
    print("Unable to get AWSTextract")
    return
}
```
