```swift
func translateText() {
    _ = Amplify.Predictions.convert(textToTranslate: "I like to eat spaghetti",
        language: .english,
        targetLanguage: .spanish,
        options: PredictionsTranslateTextRequest.Options(),
        listener: { (event) in
            switch event {
            case .success(let result):
                print(result.text)
            case .failure(let error):
                print("Error: \(error)")
            }
    })
}
```