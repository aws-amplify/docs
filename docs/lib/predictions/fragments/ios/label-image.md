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
  Identify Entities
❯ Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you like use the default configuration?
❯ Default Configuration
  Advanced Configuration

? Who should have access?
  Auth users only
❯ Auth and Guest users  

```

The Advanced Configuration will allow you to select moderation for unsafe content or all of the identified labels. Default uses both.

Run `amplify push` to create the resources in the cloud

## Working with the API

You can identify real world objects such as chairs, desks, etc. which are referred to as “labels” by using the following sample code:

```swift
func detectLabels(_ image:URL) {
	//For offline calls only to Core ML models replace `options` in the call below with this instance:
	// let options = PredictionsIdentifyRequest.Options(defaultNetworkPolicy: .offline, pluginOptions: nil)
	_ = Amplify.Predictions.identify(type: .detectLabels(.labels), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in

		switch event {
		case .completed(let result):
			let data = result as! IdentifyLabelsResult
			print(data.labels)
			//use the labels in your app as you like or display them
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}

//To identify labels with unsafe content
func detectLabels(_ image:URL) {
	_ = Amplify.Predictions.identify(type: .detectLabels(.all), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in

		switch event {
		case .completed(let result):
			let data = result as! IdentifyLabelsResult
			print(data.labels)
			//use the labels in your app as you like or display them
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```
