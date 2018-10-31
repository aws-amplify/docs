| Attribute    | Type    | Description                                                                | Possible Values                |
|--------------|---------|----------------------------------------------------------------------------|--------------------------------|
| label        | string  | label for the input field                                                  | N/A                            |
| key          | string  | key name for the attribute as defined in the User Pool                     | N/A                            |
| required     | boolean | whether or not the field is required                                       | N/A                            |
| displayOrder | number  | number indicating the order in which fields will be displayed              | N/A                            |
| type         | string  | the type attribute for the html input element                              | 'string', 'number', 'password' |
| custom       | boolean | flag which indicates whether or not the field is 'cusotm' in the User Pool | N/A                            |


By default the SignUp Component will display Username, Password, Email and Phone Number fields (all required, and in that order).  You can override the labels, displayOrder or 'required' booleans for these fields by passing objects with 'username', 'password', 'email' or 'phone_number' keys in the signUpConfig.signUpFields array.

Fields passed into the signUpFields array without a displayOrder property will be placed after those fields with defined displayOrders and in alphabetical order by key.