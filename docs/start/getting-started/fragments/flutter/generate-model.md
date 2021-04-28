With the basic setup complete, you can now model the data your application will work with. Amplify DataStore persists the modeled data on your local device and can even synchronize to a backend API without writing any additional code. These models are specified as [GraphQL](http://graphql.org/) schemas. You can [learn more](~/cli/graphql-transformer/overview.md)) about GraphQL schemas and data modeling. For now, let’s start by generating some initial data models.

<amplify-callout>

**Did you know?** You can get started with Amplify’s [admin UI](https://sandbox.amplifyapp.com/) without even creating an AWS Account.

Try it out for yourself by following this tutorial's instructions for **Admin UI**.

</amplify-callout>

<amplify-block-switcher>

<amplify-block name="Admin UI">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/generate-model-admin-ui.md"></inline-fragment>

</amplify-block>

<amplify-block name="CLI">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/generate-model-cli.md"></inline-fragment>

</amplify-block>

</amplify-block-switcher>

Now that local Amplify and data models are set up, we’re ready to integrate with the app!