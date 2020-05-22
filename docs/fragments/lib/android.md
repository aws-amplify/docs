<amplify-callout warning>

**Amplify libraries should be used for all new cloud connected applications.** If you are currently using the AWS Mobile SDK for Android, you can access the documentation [here](~/sdk/sdk.md).

</amplify-callout>

## Amplify Android

This guide shows how to build an app using our Amplify Libraries for Android and the Amplify CLI toolchain.

<docs-internal-link-button href="~/lib/project-setup/prereq.md">
  <span slot="text">Get Started 🚀</span>
</docs-internal-link-button>

## FAQs

### How are the Amplify Libraries for Android different from the AWS Mobile SDK for Android?

The Amplify Android client libraries are use-case centric whereas the AWS Mobile SDK for Android is service-centric. This enables you to focus on your use-case more rather than figuring out the AWS service nuances. The Amplify libraries provide a highly abstracted category based programming model. You can also use the Mobile SDK with the Amplify libraries using escape hatches if the use case you are trying to build is not currently available in Amplify libraries.