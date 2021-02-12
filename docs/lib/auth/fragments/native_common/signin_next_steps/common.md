Amplify Auth signin flows can be multi step process based on the configuration that you provided when the category was created. In this case you might need to call different apis to successfully authenticate the user into your app. To identify the next step to follow during a signin flow you can inspect the nextStep parameter in the signin result.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/10_signin.md"></inline-fragment>

### Confirm signin with SMS MFA

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/20_confirm_sms_mfa.md"></inline-fragment>

### Confirm signin with custom challenge

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/30_confirm_custom_challenge.md"></inline-fragment>

### Confirm signin with new password

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/40_confirm_new_password.md"></inline-fragment>
    
### Reset password

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/50_reset_password.md"></inline-fragment>

### Confirm Signup

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/60_confirm_signup.md"></inline-fragment>

### Done

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_next_steps/70_done.md"></inline-fragment>

