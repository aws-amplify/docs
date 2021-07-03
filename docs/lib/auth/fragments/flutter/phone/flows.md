There are a few ways to integrate phone numbers into an Amplify app's sign-in and verification process. 
- **As a username**: Users login with a username and password where their phone number acts as the username.
- **As a verification method**: Users login by any means, but must verify their account with an OTP (one time password) sent to their phone.
- **MFA (Multi-Factor Authentication)**: Users must verify every login with an OTP sent to their phone.

These methods may be combined with each other or used independently but they all require the same prerequisites for sending SMS messages via Amazon SNS, the notification service used by Amplify.

## Prerequisites

### Sandbox Mode

Upon enabling any of the above settings in Amplify, the CLI may prompt you with the following message:

```bash
You have enabled SMS based auth workflow. Verify your SNS account mode in the SNS console: https://console.aws.amazon.com/sns/v3/home#/mobile/text-messaging
If your account is in "Sandbox" mode, you can only send SMS messages to verified recipient phone numbers.
```

Follow the [link](https://console.aws.amazon.com/sns/v3/home#/mobile/text-messaging) to visit your SNS account. If your account is in "Sandbox" mode, you'll need to verify a phone number before you're able to send SMS messages. 

### Set up an Origination Entity

If you see the following banner at the top of your SNS homepage, you'll need to perform some additional steps before adding a phone number. If not, you can skip to **Verify a Phone Number**.

![Origination Entity warning](~/images/sns_origination_entity.png)

Clicking **Manage origination entities** will bring you to Pinpoint, where you can register an [originating entity](https://docs.aws.amazon.com/sns/latest/dg/channels-sms-originating-identities.html). Depending on which country you'll be sending SMS messages from, you may choose to register either a **Sender ID** or an **Origination number**.

> You can find the complete list of supported options for your country [here](https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html).

#### Sender ID

If your country supports using sender IDs, follow the instructions [here](https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html) to request one and enable it in your account.

#### Origination number

If your country does not support sender IDs, you must purchase an origination number.

In Pinpoint, scroll to `Number settings` and click on **Request phone number**. This will bring you to a page where you can obtain a Toll-free number for sending SMS messages. Choose the country from which you'll be sending SMS messages, then follow the prompts for requesting a new number.

After successfully requesting a toll-free number, you can return to SNS to verify your phone number.

### Verify a Phone Number

Return to SNS, and scroll to the `Sandbox destination phone numbers` section. Click **Add phone number** and follow the instructions to verify your phone number.

You are now ready to setup auth for OTP.

## Setup

<amplify-callout warning>

The following options are only available when starting a new project (via `amplify add auth`). You will not have access to these settings after creation (via `amplify update`).

- Required MFA
- Phone Number Sign-In

</amplify-callout>

<amplify-block-switcher>

<amplify-block name="New Project">

Run `amplify add auth` to create a new Cognito Auth resource, and follow the prompts below depending on how you want to integrate phone numbers into your flow.

### As a username

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/add_username.md"></inline-fragment>

### As a verification method

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/add_verification.md"></inline-fragment>

### MFA

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/add_mfa.md"></inline-fragment>

</amplify-block>

<amplify-block name="Existing Auth">

Run `amplify update auth` and follow the prompts as guided below.

### As a username

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/update_username.md"></inline-fragment>

### As a verification method

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/update_verification.md"></inline-fragment>

### MFA

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/update_mfa.md"></inline-fragment>

</amplify-block>

</amplify-block-switcher>

## Sign Up

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/sign_up.md"></inline-fragment>

## Sign In

<inline-fragment platform="flutter" src="~/lib/auth/fragments/flutter/phone/sign_in.md"></inline-fragment>
