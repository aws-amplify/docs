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

``` swift
func detectCelebs(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectCelebrity, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyCelebritiesResult
			self.celebName = data.celebrities[0].metadata.name
			print(result)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```