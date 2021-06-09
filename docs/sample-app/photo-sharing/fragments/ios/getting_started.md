PhotoSharing is a demonstration of building an iOS social networking App with [Amplify Libraries](~/lib/lib.md).

## App features

This is an App that you can perform:
* Sign In/Sign Up/Sign Out
* Post photo
* Update your profile image 
* Scroll to view a list of your created posts

### Sign In/Sign Out

The App allows you to sign up, sign in using [Amplify.Auth.signInWithWebUI](~/lib/auth/signin_web_ui.md) api.

**Sign Up Flow:**
![Sign Up](~/images/sample-app/photosharing/sign-up-flow.png)

**Sign In Flow:**
![Sign In](~/images/sample-app/photosharing/sign-in-flow.png)

**Sign Out Flow:**
![Sign Out](~/images/sample-app/photosharing/sign-out-flow.png)

### Post Photo

Once you are authenticated, you can create a post with selected image using [Amplify.DataStore.save](~/lib/datastore/data-access.md#create-and-update) and [Amplify.Storage.UploadData](~/lib/storage/upload.md) api

![Create Post](~/images/sample-app/photosharing/post-creation-flow.png)

### Update Profile Image

Besides posting image, you can also update your profile image

![Update Profile](~/images/sample-app/photosharing/profile-update-flow.png)

### Posts Loading

The loading of the posts is related to [Amplify.DataStore.query](~/lib/datastore/data-access.md#query-data) and [Amplify.Storage.downloadData](~/lib/storage/download.md)

![Load Posts](~/images/sample-app/photosharing/posts-loading.png)

## To learn more

Please go to [amplify-ios-samples](https://github.com/aws-amplify/amplify-ios-samples) Github repository to learn more.