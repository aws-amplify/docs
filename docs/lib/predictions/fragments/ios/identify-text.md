## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```bash
? What would you like to identify? (Use arrow keys)
❯ Identify Text
  Identify Entities
  Identify Labels
  Learn More 

? Would you also like to identify documents? Yes
? Who should have access? Auth and Guest users
```

## Identify text from image

Amplify will make calls to both Amazon Textract and Rekognition depending on the type of text you are looking to identify (i.e. image or document). If you are detecting text from an image you would send in `.plain` as your text format as shown below. Similarly, you can obtain `.offline` functionality or get combined results with AWS services for better results with the `.plain` text format selected. Bounding boxes for text are returned as ratios so make sure if you would like to place your bounding box on an image that you multiple the x by the width of the image, the y by the width of the image, and both height and width ratios by the image's respective height and width. Additionally, because Rekognition places (0,0) at the top left and CoreML places (0,0) at the bottom left, we have flipped the y axis of the CoreML bounding box for you since iOS starts (0,0) from the top left.

``` swift
func detectText(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectText(.plain), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyTextResult
			print(data)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

## Identify text in a document

Sending in `.form` or `.table` or `.all` will do document analysis as well as text detection to detect tables and forms in a document. See below for an example with `.form`.

```swift
func detectText(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectText(.form), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyDocumentTextResult
			print(data)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```