For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the [AWSS3](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/AWSS3/Classes/AWSS3.html) instance.

Add `import AmplifyPlugins` and then the following code:

```swift
func getEscapeHatch() {
    do {
        let plugin = try Amplify.Storage.getPlugin(for: "awsS3StoragePlugin") as! AWSS3StoragePlugin
        let awsS3 = plugin.getEscapeHatch()
        XCTAssertNotNil(awsS3)
    } catch {
        XCTFail("Failed to get AWSS3 instance")
    }
}
```
