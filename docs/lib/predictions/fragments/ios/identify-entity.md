## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```bash
? Please select from one of the categories below (Use arrow keys)
❯ Identify
  Convert
  Interpret
  Infer
  Learn More
  
? What would you like to identify?
  Identify Text
❯ Identify Entities
  Identify Labels

? Provide a friendly name for your resource
    <Enter a friendly name here>

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access?
  Auth users only
❯ Auth and Guest users
```
Run `amplify push` to create the resources in the cloud


## Working with the API

In order to match entities from a pre-created [Amazon Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/collections.html), ensure that both `collectionId` and `maxEntities` are set in your `amplifyconfiguration.json` file. The value of `collectionId` should be the name of your collection that you created either with the CLI or the SDK. The value of `maxEntities` should be a number greater than `0` or less than `51` (50 is the max number of entities Rekognition can detect from a collection). If both `collectionId` and `maxEntities` do not have valid values in the `amplifyconfiguration.json` file, then this call will just detect entities in general with facial features, landmarks, etc. Bounding boxes for entities are returned as ratios so make sure if you would like to place the bounding box of your entity on an image that you multiple the x by the width of the image, the y by the height of the image, and both height and width ratios by the image's respective height and width.

You can identify entity matches from your Rekogition Collection in your app using the following code sample:

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

To detect general entities like facial features, landmarks etc, you can use the following call pattern.  Results are mapped to `IdentifyEntityResult`.  For example:

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
