## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```bash
? What would you like to convert?
  Convert text into a different language
❯ Convert text to speech
  Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

## Working with the API

Here is an example of converting text to speech. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a voice in the options object as shown below.

```swift
func textToSpeech(text: String) {
	let options = PredictionsTextToSpeechRequest.Options(voiceType: .englishFemaleIvy, pluginOptions: nil)

	_ = Amplify.Predictions.convert(textToSpeech: text, options: options, listener: { (event) in

		switch event {
		case .completed(let result):
			print(result.audioData)
			self.audioData = result.audioData
			let player = try? AVAudioPlayer(data: result.audioData)
			player?.play()
		default:
			print("")

		}
	})
}
```
