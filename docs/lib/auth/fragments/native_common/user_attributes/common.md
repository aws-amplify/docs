## Fetch the current user's attributes

Invoke the following api to get the list of attributes assigned to the user.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/10_fetch_attributes.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/user_attributes/10_fetch_attributes.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/user_attributes/10_fetch_attributes.md"></inline-fragment>

## Update user attribute

Invoke the update api for creating new or updating existing user attributes.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/20_update_user_attribute.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/user_attributes/20_update_user_attribute.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/user_attributes/20_update_user_attribute.md"></inline-fragment>

## Verify user attribute
Some attributes require confirmation for the attribute update to complete. If the attribute need to be confirmed, the result of the above api will be `confirmAttributeWithCode`. A confirmation code will be sent to the delivery medium mentioned in the delivery details.
When the user gets the confirmation code, you can present a UI to the user to enter the code and invoke the confirm attribute api with their input:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/30_confirm_attribute.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/user_attributes/30_confirm_attribute.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/user_attributes/30_confirm_attribute.md"></inline-fragment>

## Resend verification code
If the code has expired or the user needs to resend the confirmation code, invoke the resend api as shown below:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/40_resend_code.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/user_attributes/40_resend_code.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/user_attributes/40_resend_code.md"></inline-fragment>
