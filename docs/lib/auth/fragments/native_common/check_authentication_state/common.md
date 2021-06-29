Use the following method to check if the current user is authenticated.   This is the recommended approach for determining whether you should display a sign in screen when your application starts.

<amplify-callout>
`fetchAuthSession().isSignedIn()` returns true even after the session is expired. It's necessary to check whether refresh token and AuthSession is still valid or not before calling `fetchAuthSession().isSignedIn()`.
</amplify-callout>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/check_authentication_state/10_checkSignInState.md"></inline-fragment>