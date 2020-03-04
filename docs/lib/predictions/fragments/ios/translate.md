If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```bash
? What would you like to convert? (Use arrow keys)
❯ Convert text into a different language
  Convert text to speech
  Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

## Working with the API

Here is an example of translating text. In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

```swift
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


