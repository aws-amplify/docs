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
