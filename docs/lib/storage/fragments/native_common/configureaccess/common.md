 When adding the Storage category, you configure the level of access authenticated and guest users have to your S3 bucket. Additionally, when uploading files using the Storage category, you can specify the access level for that file to be either guest, protected, or private.

- **Guest** Accessible by all users of your application
- **Protected** Readable by all users, but only writable by the creating user
- **Private** Readable and writable only by the creating user

For guest access, the user of your application is not signed in, however you will still need [Authentication](~/lib/auth/getting-started.md) configured in your application to allow the user to assume an unauthenticated role from Cognito Identity Pool.

For protected and private access, the `[USER_ID]` below corresponds to the unique ID of the user. Once the user has signed in, the `[USER_ID]` can be retrieved from the session by accessing the identity id. See [Accessing credentials](~/lib/auth/access_credentials.md) to retrieve the identity id, and use this as the unique ID of the authenticated user.

<amplify-callout>

The default access level for the Storage category is **guest**. Unless you specify otherwise, all uploaded files will be publicly available for all users of your application. This means a user that is using your application and is ot signed in will have access. A user that is not using your application will not be able to access your files.

</amplify-callout>

## Protected access

After the user has signed in, create an options object specifying the `protected` access level to allow other users to read the object:

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/10_protected_upload.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/10_protected_upload.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/10_protected_upload.md"></inline-fragment>

This will upload with the prefix `/protected/[USER_ID]/` followed by the key.

For other users to read the file, you must specify the user ID of the creating user in the passed options. 

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/20_protected_download.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/20_protected_download.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/20_protected_download.md"></inline-fragment>

## Private Access

Create an options object specifying the private access level to only allow an object to be accessed by the creating user

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/30_private_upload.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/30_private_upload.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/30_private_upload.md"></inline-fragment>

This will upload with the prefix `/private/[USER_ID]/`, followed by the key.

For the user to read the file, specify the same access level (`private`) and key you used to upload:

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/40_private_download.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/40_private_download.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/40_private_download.md"></inline-fragment>

