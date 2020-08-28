For advanced use cases where Amplify does not provide the functionality you're looking for,
you can retrieve the escape hatch to access the underlying `AWSMobileClient` instance.

<amplify-callout>
The return type and behavior of the escape hatch is an implementation detail and thus can change (and in fact we plan to change it) in the future.
</amplify-callout>

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/escapehatch/10_awsmobileclient_escape.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/escapehatch/10_awsmobileclient_escape.md"></inline-fragment>