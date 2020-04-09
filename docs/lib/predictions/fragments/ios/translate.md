If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```bash
? Please select from one of the categories below
  Identify
❯ Convert
  Interpret
  Infer
  Learn More
  
? What would you like to convert? (Use arrow keys)
❯ Translate text into a different language
  Generate speech audio from text
  Transcribe text from audio

? Provide a friendly name for your resource
  <Enter a friendly name here>

? What is the source language? (Use arrow keys)
  <Select your default source language>

? What is the target language? (Use arrow keys)
  <Select your default target language>

? Who should have access?
  Auth users only
❯ Auth and Guest users

```

Run `amplify push` to create the resources in the cloud

## Working with the API

Here is an example of translating text. In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

```swift
import Amplify

...

func translateText(text:String) {
	_ = Amplify.Predictions.convert(textToTranslate: text,
      language: .english,
      targetLanguage: .italian,
      options: PredictionsTranslateTextRequest.Options(),
        listener: { (event) in
          switch event {
          case .completed(let result):
            print(result.text)
          default:
            print("")
        }
    })
}
```
As a result of running this code, you will see the translated text printed to the console.
