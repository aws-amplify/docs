## Fetch the current user's attributes

Invoke the following api to get the list of attributes assigned for the user.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/10_fetch_attributes.md"></inline-fragment>

## Update user attribute

Invoke the update api for creating new or updating an user attribute. 

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/20_update_user_attribute.md"></inline-fragment>

Some attribute require to be confirmed for the attribute updation to be complete. If the attribute need to be confirmed the result for the above api will be `confirmAttributeWithCode`. A confirmation code will be send to the delivery medium mentioned in the delivery details.
When the user gets the confirmation code,  you can present a UI to enter the code and invoke confirm attribute api:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/30_confirm_attribute.md"></inline-fragment>

If the code has expired or the user need to resend the confirmation code invoke resend api as shown below:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/user_attributes/40_resend_code.md"></inline-fragment>