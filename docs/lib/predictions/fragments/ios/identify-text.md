## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```bash
? Please select from one of the categories below
❯ Identify
  Convert
  Interpret
  Infer
  Learn More

? What would you like to identify? (Use arrow keys)
❯ Identify Text
  Identify Entities
  Identify Labels

? Provide a friendly name for your resource
    <Enter a friendly name here>

? Would you also like to identify documents?
    <Enter 'y'> 

? Who should have access?
  Auth users only
❯ Auth and Guest users
```

## Identify text from image

Amplify will make calls to both Amazon Textract and Rekognition depending on the type of text you are looking to identify (i.e. image or document).

If you are detecting text from an image you would send in `.plain` as your text format as shown below.  Using `.plain` with `PredictionsIdentifyRequest.Options()` combines results from on device results from Core ML and AWS services to yield more accurate results.

``` swift
    func detectText(_ image: URL, completion: @escaping ([IdentifiedWord]) -> Void) {
        _ = Amplify.Predictions.identify(type: .detectText(.plain), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
            switch event {
            case .completed(let result):
                let data = result as! IdentifyTextResult
                completion(data.words!)
            case .failed(let error):
                print(error)
            default:
                print("")
            }
        })
    }
```

**Note**: Bounding boxes in IdentifyTextResult are returned as ratios. If you would like to place bounding boxes on individual recognized words that appear in the image, use the following method to calculate a frame for a single bounding box.
```swift 
    @IBAction func didTapButton(_ sender: Any) {
        let imageURL = URL(string: "https://imageWithText")
        let data = try? Data(contentsOf: imageURL!)
        let image = UIImage(data: data!)
        let imageView = UIImageView(image: image)
        self.view.addSubview(imageView)

        detectText(imageURL!, completion: { words in
            let word = words.first!
            DispatchQueue.main.async {
                let xBoundingBox = word.boundingBox.origin.x * imageView.frame.size.width
                let yBoundingBox = word.boundingBox.origin.y * imageView.frame.size.height
                let widthBoundingBox = word.boundingBox.size.width * imageView.frame.size.width
                let heightBoundingBox = word.boundingBox.size.height * imageView.frame.size.height
                let boundingBox = UIView(frame: CGRect(x: xBoundingBox, y: yBoundingBox, width: widthBoundingBox, height: heightBoundingBox))
                boundingBox.backgroundColor = .red
                imageView.addSubview(boundingBox)
            }
        })
    }
```
Additionally it's important to note that Rekognition places (0,0) at the top left and Core ML places (0,0) at the bottom left. In order to handle this issue, we have flipped the y axis of the CoreML bounding box for you since iOS starts (0,0) from the top left.


To get results that utilize on-device capabilities (Core ML), without combining results from the backend, you can use the following to pass into the `options` argument of the `Amplify.Predictions.identify` function.
```swift
let options = PredictionsIdentifyRequest.Options(defaultNetworkPolicy: .offline, pluginOptions: nil)
```

## Identify text in a document

Sending in `.form` or `.table` or `.all` will do document analysis as well as text detection to detect tables and forms in a document. See below for an example with `.form`.

```swift
func detectText(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectText(.form), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyDocumentTextResult
			print(data)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```
