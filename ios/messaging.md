---
---
# Messaging

Engage your users more deeply by tying their app usage behavior to Push Notification, email, or SMS messaging campaigns.

When you enable the Amplify CLI Analytics category, your app is registered with Amazon Pinpoint. You can define user segments and send messages to those recipients through the Amazon Pinpoint console.

Amazon Pinpoint also enables you to gather and visualize your app's [Analytics](./analytics). The metrics you gather can be as simple as session start and stop data, or you can customize them to show things like how closely actual behavior matches your predicted model.

You can then algorithmically tie messaging campaigns to user behavior. For instance, send a discount mail to frequent users, or send a push notification that initiates a data sync for users that have selected a certain category in a feature of your app.

## Set Up Your Backend

To set up your app to receive Push Notifications from Amazon Pinpoint, see [Push Notification](./push-notifications).

To set up email or SMS as part of an Amazon Pinpoint campaign perform the following steps.

Complete the [Get Started](./start) and [Analytics](./analytics) steps before you proceed.

### For Email:

In a terminal window, use the following command to open the project for your app by in the Amazon Pinpoint console.

```bash
$ cd YOUR_APP_PROJECT_FOLDER
$ amplify console analytics
```

In the Amazon Pinpoint console, navigate to `Settings` on the left, choose the `Channels` tab, and then choose `Email`.

Choose the `Enable email channel` check box, choose `Email address`, type the address that you want your messages to come from, and then choose `verify`.

The email account you enter will receive an email requesting your approval for Amazon Pinpoint to use that account as the sender address for emails sent by the system. The status of `Pending Verification` is displayed in the console entry field until Amazon Pinpoint has processed your approval.

Choose `Email domain`, type the domain that you want your messages to come from, and then choose `verify`.

A dialog box displays the name and value of the TXT record you must add to the domain's settings. The status of Pending Verification is displayed in the entry field until the console processes your approval.

Add a default user name to `Default from address`.

Choose `Save`.

For information about sending mail from Amazon Pinpoint, see Sending an Email Message.

### For SMS:

In a terminal window, use the following command to open the project for your app by in the Amazon Pinpoint console.

```bash
$ cd YOUR_APP_PROJECT_FOLDER
$ amplify console analytics
```

Navigate to `Settings` in the left-hand navigation, choose `SMS`, and then choose `Enable SMS channel`.

Navigate to `Direct messaging` in the left-hand navigation and chose `SMS`.

Adjust the options for `Default message type`, `Account spend limit`, and `Default sender ID`. For more information about these options, see [Updating SMS Settings](https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-manage.html).

For information about sending SMS messages from Amazon Pinpoint, see [Sending an SMS Message](https://docs.aws.amazon.com/pinpoint/latest/userguide/messages.html#messages-sms).
