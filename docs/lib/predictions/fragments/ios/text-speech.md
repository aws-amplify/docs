## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```bash
? Please select from one of the categories below
  Identify
❯ Convert
  Interpret
  Infer
  Learn More
  
? What would you like to convert?
  Translate text into a different language
❯ Generate speech audio from text
  Transcribe text from audio

? Provide a friendly name for your resource
  <Enter a friendly name here>
  
? What is the source language? (Use arrow keys)
  <Select your default source language>

? Select a speaker (Use arrow keys)
  <Select your default speaker voice>
  
? Who should have access?
  Auth users only
❯ Auth and Guest users
```

Run `amplify push` to create the resources in the cloud

## Working with the API

Here is an example of converting text to speech. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a voice in the options object as shown below.

```swift
import Amplify
import AVFoundation

...

var player: AVAudioPlayer?

...

func textToSpeech(text: String) {
  let options = PredictionsTextToSpeechRequest.Options(voiceType: .englishFemaleIvy, pluginOptions: nil)

  _ = Amplify.Predictions.convert(textToSpeech: text, options: options, listener: { (event) in
    switch event {
    case .completed(let result):
      print(result.audioData)
      self.player = try? AVAudioPlayer(data: result.audioData)
      if let player = self.player {
        player.play()
      }
      default:
        print("")
      }
    })
}
```
As a result of running this code, you will hear audio of the text being emitted from your device.
