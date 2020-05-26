Signout

Invoke the `signOut` api to signout a user from the Auth category. You can have only one user signedin into the app category at a given time.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/10_local_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signout/10_local_signout.md"></inline-fragment>

Calling signOut without any option will just delete the local cache and keychain of the user. If you would like to signOut globally invoke the signOut api with signout options.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/signout/20_global_signout.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signout/20_global_signout.md"></inline-fragment>
