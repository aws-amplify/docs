## Set up your backend

This will allow you to determine key phrases, sentiment, language, syntax, and entities from text. If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Interpret**. Then use the following answers:

```bash
? What would you like to interpret? (Use arrow keys)
❯ Interpret Text
  Learn More

? What kind of interpretation would you like?
  Language
  Entity
  Keyphrase
  Sentiment
  Syntax
❯ All

? Who should have access? Auth and Guest users
```

## Working with the API

Here is an example of sending text for interpretation such as sentiment analysis or natural language characteristics. 

```swift
func interpret(text: String) {

	_ = Amplify.Predictions.interpret(text: text, options: PredictionsInterpretRequest.Options(), listener: { (event) in

			switch event {
			case .completed(let result):
			    print(result)
			case .failed(let error):
			    print(error)
			default:
			break
		}
		})
}
```

