## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```console
? What would you like to convert?
  Convert text into a different language
  Convert text to speech
❯ Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

## Working with the API

Here is an example of converting speech to text. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a language in the options object as shown below.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func speechToText(speech: URL) {
    let options = PredictionsSpeechToTextRequest.Options(
        defaultNetworkPolicy: .auto,
        language: .usEnglish,
        pluginOptions: nil
    )

    _ = Amplify.Predictions.convert(speechToText: speech, options: options) { event in
        switch event {
        case let .success(result):
            print(result.transcription)
        case let .failure(error):
            print(error)
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func speechToText(speech: URL) -> AnyCancellable {
    let options = PredictionsSpeechToTextRequest.Options(
        defaultNetworkPolicy: .auto,
        language: .usEnglish,
        pluginOptions: nil
    )

    let sink = Amplify.Predictions.convert(speechToText: speech, options: options)
        .resultPublisher
        .sink {
            if case let .failure(error) = $0 {
                print(error)
            }
        }
        receiveValue: { result in
            print(result.transcription)
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>
