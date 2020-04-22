For any of the AWS services behind predictions, you can use the SDK object to get access to any methods we are not calling on your behalf by using the Escape Hatch like so:

```swift
let plugin = try Amplify.Predictions.getPlugin(for: "awsPredictionsPlugin") as! AWSPredictionsPlugin
let escapeHatch = plugin.getEscapeHatch(key: .rekognition)
let rekognitionService = escapeHatch as! AWSRekognition

let request = AWSRekognitionCreateCollectionRequest()
if let request = request {
    rekognitionService.createCollection(request)
}
```
