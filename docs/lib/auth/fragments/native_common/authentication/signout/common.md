Signout

Invoke the `signOut` api to sign out a user from the Auth category. You can only have one user signed in at a given time.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/10_local_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signout/10_local_signout.md"></inline-fragment>

Calling signOut without any options will just delete the local cache and keychain of the user. If you would like to sign out of all devices, invoke the signOut api with advanced options.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/20_global_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signout/20_global_signout.md"></inline-fragment>
