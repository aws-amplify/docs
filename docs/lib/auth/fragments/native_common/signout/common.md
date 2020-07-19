Invoke the `signOut` api to sign out a user from the Auth category. You can only have one user signed in at a given time.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/10_local_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signout/10_local_signout.md"></inline-fragment>

Calling signOut without any options will just delete the local cache and keychain of the user. If you would like to sign out of all devices, invoke the signOut api with advanced options.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/20_global_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signout/20_global_signout.md"></inline-fragment>

Calling signout with `globalSignOut = true` will invalidate all the Cognito User Pool tokens of the signed in user. If the user is signed into a device, they won't be authorized to perform a task that requires a valid token when a global signout is called from some other device. They need to sign in again to get valid tokens.

<amplify-callout warning>
Global signout functionality does not work if you use one of the web UI sign in methods.
</amplify-callout>