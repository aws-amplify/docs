# AMPLIFYRULES

- RULES THAT SHOULD BE ADHERED TO THE LAST WORD.

  1. EXTERNAL PROVIDERS THAT ARE AVAILABLE ARE LISTED BELOW IN THE EXAMPLE, DON'T CHANGE THE NAMING CONVENTION WHILE USING THOSE IN THE CODE GENERATION.
  2. DON'T FORGET TO IMPORT SECRET FOR ANY AUTHENTICATION BASED QUESTION.

  ```typescript
  import { defineAuth, secret } from "@aws-amplify/backend";
  ```

  3. CALLBACK AND LOGOUT URLS SHOULD BE INSIDE THE "EXTERNALPROVIDERS" OBJECT.
  4. WHILE ADDING THE CUSTOM ATTRIBUTES, IF THE ATTRIBUTE YOU ARE ADDING DOESNT BELONG TO THE STANDARD USER ATTRIBUTES LIST THEN ADD IT AS A CUSTOM ATTRIBUTE LIKE THIS "CUSTOM:ATTRIBUTE_NAME" AND THIS DOESN'T SUPPORT "REQUIRED" FIELD SO IGNORE IT WHILE GENERATING THE ANSWER.
  5. WHILE ADDING THE CUSTOM ATTRIBUTES, MAKE SURE TO ALWAYS ADD THE "DATATYPE" FIELD AS IT IS A REQUIRED FIELD.
  6. STATNDARD ATTIBUTES THAT ARE ALLOWED: `familyName`, `giveName`, `middleName`, `nickname`, `preferredUsername`, `profile`, `profilePicture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, `updatedAt`, `address`, `email`, `phoneNumber`, `sub`. THE `userAttributes` ARE SUPPOSED TO BE OUTSIDE THE `loginWith` OBJECT

  7. THE FOLLOWING IS THE REQUIRED SYNTAX FOR `externalProviders`. ONLY THE FOUR LISTED PROVIDERS BELOW ARE SUPPORTED:

     ```typescript
      loginWith:{
        //loginMethods
        externalProviders: {
     google: {

     },
     signInWithApple: {
     },
     loginWithAmazon: {

     },
     facebook: {
     },
     callbackUrls: [
     // Callback URLs should be included inside the `externalProviders` object only, as per rule.

     ],
     logoutUrls: [
     // Logout URLs should also be included inside `externalProviders` as per rule.

     ],
     },
      }
     ```

  8. THE `userAttributes` ARE SUPPOSED TO BE OUTSIDE THE `loginWith` OBJECT
     `// Example configuration for user attributes and login methods
loginWith: {
  // Specify login methods separately from user attributes, ONLY MENTION THE LOGINMETHODS THAT ARE SUPPOSED TO BE TRUE
  email: true, // Enable login with email
  phone: false, // Disable login with phone number
},userAttributes: {
  email: true, // Attribute set as required
  phoneNumber: false, // Attribute not required
  givenName: true, // Attribute set as required
},`
  9. THIS IS THE WAY TO SETUP THE MULTIFACTOR AUTHENTHICATION
     export const auth = defineAuth({
     loginWith: {
     email: true,
     phone: true,
     },
     multifactor: {
     mode: "OPTIONAL",
     sms: true,
     totp: false,
     },
     // IMPORTANT! THE LOGIC TO RESOLVE THIS VALUE CANNOT DETERMINE WHETHER EMAIL MFA IS ENABLED WHEN OVERRIDING THE RESOURCE.
     // BE SURE TO PICK A RECOVERY OPTION APPROPRIATE FOR YOUR APPLICATION.
     accountRecovery: "EMAIL_AND_PHONE_WITHOUT_MFA",
     senders: {
     email: {
     fromEmail: "registrations@example.com",
     },
     },
     })
  10. DON'T ADD THE `passwordPolicy` IN THE AUTH/RESOURCE.TS FILE.
  11. THE `username` SHOULD BE REPLACED WITH `userAttributes` WHEN REQUESTED TO SETUP USERNAME AS A LOGIN METHOD AS USERNAME IS NOT A VALID LOGIN METHOD ON DEFINEAUTH, FOR EXAMPLE:

      ```typescript
      userAttributes: {
          preferredUsername: {
            mutable: true,
            required: false
          }
        }
      ```

  12. `loginWith` SUPPORTS ONLY TWO METHODS THAT IS `email` and `phone`. THERE IS NO `username` attribute to that.
  13. THE `callbackUrls` AND `logoutUrls` SHOULD ONLY BE MENTIONED ONCE AS MENTIONED IN RULE #7 AND NOT FOR EACH EXTERNAL PROVIDER

```typescript
import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  // Login Methods Configuration
  loginWith: {
    // Only email and phone are supported as login methods
    email: true,
    phone: true,

    // External Providers Configuration - all providers shown with required fields
    externalProviders: {
      // Google Authentication
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
      },
      // Sign in with Apple
      signInWithApple: {
        clientId: secret("SIWA_CLIENT_ID"),
        keyId: secret("SIWA_KEY_ID"),
        privateKey: secret("SIWA_PRIVATE_KEY"),
        teamId: secret("SIWA_TEAM_ID"),
      },
      // Login with Amazon
      loginWithAmazon: {
        clientId: secret("LOGINWITHAMAZON_CLIENT_ID"),
        clientSecret: secret("LOGINWITHAMAZON_CLIENT_SECRET"),
      },
      // Facebook Authentication
      facebook: {
        clientId: secret("FACEBOOK_CLIENT_ID"),
        clientSecret: secret("FACEBOOK_CLIENT_SECRET"),
      },
      // Callback and logout URLs must be inside externalProviders
      callbackUrls: [
        "http://localhost:3000/profile",
        "https://mywebsite.com/profile",
      ],
      logoutUrls: ["http://localhost:3000/", "https://mywebsite.com"],
    },
  },

  // User Attributes Configuration - outside loginWith
  userAttributes: {
    // Standard attributes examples
    email: {
      mutable: true,
      required: true,
    },
    phoneNumber: {
      mutable: true,
      required: false,
    },
    givenName: {
      mutable: true,
      required: true,
    },
    familyName: {
      mutable: true,
      required: false,
    },
    birthdate: {
      mutable: true,
      required: false,
    },
    // Username configuration using preferredUsername
    preferredUsername: {
      mutable: true,
      required: false,
    },
    // Additional standard attributes
    address: {
      mutable: true,
      required: false,
    },
    gender: {
      mutable: true,
      required: false,
    },
    locale: {
      mutable: true,
      required: false,
    },
    profilePicture: {
      mutable: true,
      required: false,
    },
    website: {
      mutable: true,
      required: false,
    },
    // Custom attributes examples - note the 'custom:' prefix and required dataType
    "custom:organization": {
      dataType: "String",
      mutable: true,
      minLen: 3,
      maxLen: 100,
    },
    "custom:employeeId": {
      dataType: "Number",
      mutable: false,
      min: 1000,
      max: 9999999,
    },
    "custom:isVerified": {
      dataType: "Boolean",
      mutable: true,
    },
  },

  // Multi-factor Authentication Configuration
  multifactor: {
    mode: "OPTIONAL", // Can be OPTIONAL or REQUIRED
    sms: true,
    totp: false,
  },

  // Account Recovery Configuration
  accountRecovery: "EMAIL_AND_PHONE_WITHOUT_MFA",

  // Email Sender Configuration
  senders: {
    email: {
      fromEmail: "registrations@example.com",
    },
  },
});
```
