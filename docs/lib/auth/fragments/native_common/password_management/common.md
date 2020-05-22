Password management [TODO: contents]

## Reset password
Amplify Auth provides interface to reset a users password. This can be used when the user initiate the forgot password flow. To trigger reset password:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/10_reset_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/10_reset_password.md"></inline-fragment>

To verify the password reset invoke the confirmPassword api 

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/20_confirm_reset_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/20_confirm_reset_password.md"></inline-fragment>

## Change password
A signed in user can update their password using the following api:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/password_management/30_change_password.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/password_management/30_change_password.md"></inline-fragment>


