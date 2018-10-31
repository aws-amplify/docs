| Attribute    | Type    | Description                                                                | Possible Values                |
|--------------|---------|----------------------------------------------------------------------------|--------------------------------|
| label        | string  | label for the input field                                                  | N/A                            |
| key          | string  | key name for the attribute as defined in the User Pool                     | N/A                            |
| required     | boolean | whether or not the field is required                                       | N/A                            |
| displayOrder | number  | number indicating the order in which fields will be displayed              | N/A                            |
| type         | string  | the type attribute for the html input element                              | 'string', 'number', 'password' |
| custom       | boolean | flag which indicates whether or not the field is 'custom' in the User Pool | N/A                            |


By default the SignUp Component will display Username, Password, Email and Phone Number fields (all required, and in that order).  You can override the labels, displayOrder or 'required' values for these fields by passing objects with 'username', 'password', 'email' or 'phone_number' keys in the signUpConfig.signUpFields array.

Fields passed into the signUpFields array without a displayOrder value will be placed after those fields with defined displayOrder values and in alphabetical order by key.