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

In order to match entities from a pre-created [Amazon Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/collections.html), make sure there is a `collectionId` set in your `amplifyconfiguration.json` file. If there is no `collectionId` set in the `amplifyconfiguration.json` file, then this call will just detect entities in general with facial features, landmarks, etc.

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
