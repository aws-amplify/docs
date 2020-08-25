An intentional decision with Amplify Auth was to avoid any public methods exposing credentials or manipulating them.  

With Auth, you simply sign in and it handles everything else needed to keep the credentials up to date and vend them to the other categories.  

<inline-fragment platform="android" src="~/lib/auth/fragments/android/access_credentials/10_fetchAuthSession.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/access_credentials/10_fetchAuthSession.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/access_credentials/10_fetchAuthSession.md"></inline-fragment>
