An intentional decision with Amplify Auth was to avoid any public methods exposing credentials or manipulating them.  

With Auth, you simply sign in and it handles everything else needed to keep the credentials up to date and vend them to the other categories.  

However, if you need to access them in relation to working with an API outside Amplify or want access to AWS specific identifying information (e.g. IdentityId),
you can access these implementation details by casting the result of fetchAuthSession as follows:  

<inline-fragment platform="android" src="~/lib/auth/fragments/android/access_credentials/10_fetchAuthSession.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/access_credentials/10_fetchAuthSession.md"></inline-fragment>
