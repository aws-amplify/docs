## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```bash
? Please select from one of the categories below
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

? Would you like use the default configuration?
❯ Default Configuration
  Advanced Configuration

? Who should have access?
  Auth users only
❯ Auth and Guest users

```
Run `amplify push` to create the resources in the cloud

## Working with the API

``` swift
func detectCelebs(_ image: URL) {
  _ = Amplify.Predictions.identify(type: .detectCelebrity, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
    switch event {
    case .completed(let result):
      let data = result as! IdentifyCelebritiesResult
      if let detectedCeleb = data.celebrities.first {
        print("Celebrity Name: \(detectedCeleb.metadata.name)")
      }
      print(result)
    case .failed(let error):
      print(error)
    default:
      print("")
    }
  })
}
```
As a result of passing in a URL of an image of a celebrity, you should see the corresponding celebrity name printed to the screen along with additional metadata.
