## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```bash
? What would you like to identify? 
  Identify Text
  Identify Entities
❯ Identify Labels
  Learn More 

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access? Auth and Guest users
```

The Advanced Configuration will allow you to select moderation for unsafe content or all of the identified labels. Default uses both.

## Working with the API

You can identify labels in your app using the following code sample:

```swift
func detectLabels(_ image:URL) {
	//for offline calls only to coreml models replace options in the call below with the below instantiation of it
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

//to identify labels with unsafe content
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