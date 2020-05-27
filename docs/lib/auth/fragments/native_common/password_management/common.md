## Reset password
In order to reset your password, use the resetPassword api - this will send a code to the user attribute configured to receive such a reset code (e.g. email or SMS):

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/10_reset_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/10_reset_password.md"></inline-fragment>

To complete the password reset process, invoke the confirmResetPassword api with the code you were sent and the new password you want.

<amplify-callout>
Note that you must call confirmResetPassword in the same app session as you call resetPassword. If you close the app, you'll need to call resetPassword again.
As a result, for testing purposes, you'll at least need an input field where you can enter the code sent by the resetPassword api and feed it to confirmResetPassword.
</amplify-callout>

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/20_confirm_reset_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/20_confirm_reset_password.md"></inline-fragment>

## Change password
A signed in user can update their password using the updatePassword api:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/30_change_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/30_change_password.md"></inline-fragment>
