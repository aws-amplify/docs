## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```bash
? What would you like to identify? 
  Identify Text
❯ Identify Entities
  Identify Labels
  Learn More 

? Would you like use the default configuration? Default Configuration

? Who should have access? Auth and Guest users
```

## Working with the API

In order to match entities from a pre-created [Amazon Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/collections.html), make sure there is a `collectionId` set in your `amplifyconfiguration.json` file. If there is no `collectionId` set in the `amplifyconfiguration.json` file, then this call will just detect entities in general with facial features, landmarks, etc. Bounding boxes for entities are returned as ratios so make sure if you would like to place the bounding box of your entity on an image that you multiple the x by the width of the image, the y by the width of the image, and both height and width ratios by the image's respective height and width.

You can identify entities in your app using the following code sample:

``` swift
func detectEntities(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectEntities, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyEntityMatchesResult
			print(data.entities)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```
If you would like to only detect entities and you do not have a collection of existing entities to match entities to, the call will be similar but the result is mapped to `IdentifyEntitiesResult` instead of the `IdentifyEntityMatchesResult`.

``` swift
func detectEntities(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectEntities, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyEntitiesResult
			print(data.entities)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```