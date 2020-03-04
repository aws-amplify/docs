## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```bash
? What would you like to convert?
  Convert text into a different language
  Convert text to speech
❯ Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

## Working with the API

Here is an example of converting speech to text. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a language in the options object as shown below.

```swift
    func speechToText(speech: URL) {
        let options = PredictionsSpeechToTextRequest.Options(defaultNetworkPolicy: .auto, language: .usEnglish, pluginOptions: nil)
        _ = Amplify.Predictions.convert(speechToText: speech, options: options, listener: { (event) in
            
            switch event {
            case .completed(let result):
                print(result.transcription)
            default:
                print("")
                
                
            }
        })
    }
```

