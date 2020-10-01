<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func translateText() {
    Amplify.Predictions.convert(textToTranslate: "I like to eat spaghetti",
        language: .english,
        targetLanguage: .spanish,
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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func translateText() -> AnyCancellable {
    Amplify.Predictions.convert(
        textToTranslate: "I like to eat spaghetti",
        language: .english,
        targetLanguage: .spanish
    )
    .resultPublisher
    .sink {
        if case let .failure(error) = $0 {
            print("Error: \(error)")
        }
    }
    receiveValue: { result in
        print(result.text)
    }
}
```

</amplify-block>

</amplify-block-switcher>
