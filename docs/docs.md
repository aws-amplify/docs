---
title: Docs
description: Amplify Framework documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.
noTemplate: true
disableLinkification: true
---

<amplify-hero>
  <h1 slot="heading" class="font-weight-300">
    Amplify Framework Documentation
  </h1>
  <p slot="subheading" class="font-weight-300">
    Learn how to use Amplify to develop and deploy cloud-powered mobile
    and web apps
  </p>
  <docs-landing-hero-cta slot="cta" />
</amplify-hero>
<amplify-container
  class="background-color-off-white"
  inner-class="padding-top-lg padding-bottom-lg padding-horizontal-md">
  <amplify-responsive-grid class="margin-top-lg">
    <docs-card url="~/lib/lib.md" url-override-for-mobile-filter="~/sdk/sdk.md" class="border-radius">
      <img slot="graphic" src="~/assets/lib.png" />
      <h4 slot="heading">Amplify Libraries</h4>
      <p slot="description">
        Open source libraries and UI components for adding
        cloud-powered functionality.
      </p>
    </docs-card>
    <docs-card url="~/cli/cli.md" class="border-radius">
      <img slot="graphic" src="~/assets/cli.png" />
      <h4 slot="heading">Amplify CLI</h4>
      <p slot="description">
        An open source interactive toolchain to create and manage a backend for your apps.
      </p>
    </docs-card>
    <docs-card external url="https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html" class="border-radius" container-tag="amplify-external-link">
      <img slot="graphic" src="~/assets/console.png" />
      <h4 slot="heading">Amplify Console</h4>
      <p slot="description">
        An AWS service to deploy and host fullstack serverless web applications.
      </p>
    </docs-card>
  </amplify-responsive-grid>
</amplify-container>
<amplify-container
  class="background-color-off-white"
  inner-class="padding-bottom-lg padding-horizontal-md"
>
  <h4 class="text-align-center">Explore Features</h4>
  <inline-fragment src="~/fragments/features-grid.md"></inline-fragment>
</amplify-container>
<docs-link-banner></docs-link-banner>
<docs-footer></docs-footer>