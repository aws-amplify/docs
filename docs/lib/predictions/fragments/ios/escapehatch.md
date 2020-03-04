For any of the AWS services behind predictions, you can use the SDK object to get access to any methods we are not calling on your behalf by using the Escape Hatch like so:

```swift
let rekognitionService = Amplify.Predictions.getEscapeHatch(key: .rekognition) as! AWSRekognition
let request = rekognitionService.AWSRekognitionCreateCollectionRequest()
rekognitionService.createCollection(request)
```
