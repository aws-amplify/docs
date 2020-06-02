```swift
import Amplify

...

func translateText(text:String) {
    _ = Amplify.Predictions.convert(textToTranslate: "I like to eat spaghetti",
        language: .english,
        targetLanguage: .spanish,
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