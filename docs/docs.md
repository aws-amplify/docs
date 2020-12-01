---
title: Docs
description: Amplify Framework documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.
noTemplate: true
disableLinkification: true
---

<docs-hero>
  <h1 slot="heading" class="font-weight-300">
    Amplify Framework Documentation
  </h1>
  <p slot="subheading" class="font-weight-300">
    Learn how to use Amplify to develop and deploy cloud-powered mobile
    and web apps
  </p>

  <docs-landing-hero-cta slot="cta" />
</docs-hero>
<docs-container
  class="background-color-off-white"
  inner-class="padding-top-lg padding-bottom-lg padding-horizontal-md">
  <h4 class="text-align-center">Discover the end-to-end AWS solution for mobile and front-end web developers</h4>
    <amplify-responsive-grid columns="1">
  <amplify-responsive-grid columns="4" class="margin-top-lg">
      <docs-card url="~/lib/lib.md" class="border-radius">
        <img slot="graphic" src="~/assets/lib.png" />
        <h4 slot="heading">Amplify Libraries</h4>
        <p slot="description">
          Connect app to new or existing AWS services (Cognito, S3, and more).
        </p>
      </docs-card>
      <docs-card url="~/cli/cli.md" class="border-radius">
        <img slot="graphic" src="~/assets/cli.png" />
        <h4 slot="heading">Amplify CLI</h4>
        <p slot="description">
        Configure an app backend with a guided CLI workflow.
        </p>
      </docs-card>
      <docs-card url="~/console/console.md" class="border-radius" >
        <img slot="graphic" src="~/assets/console.png" />
        <h4 slot="heading">Amplify Console</h4>
        <p slot="description">
          AWS service for creating an app backend and hosting full-stack web apps.
        </p>
      </docs-card>
      <docs-card url="~/console/adminui/intro.md" class="border-radius">
        <img slot="graphic" src="~/assets/console.png" />
        <h4 slot="heading">NEW! Amplify Admin UI</h4>
        <p slot="description">
          Visually configure and manage your app backend.
        </p>
      </docs-card>
    </amplify-responsive-grid>
    <iframe class="padding-horizontal-md justify-self-center" width="560" height="315" src="https://www.youtube-nocookie.com/embed/-Vm-4BbY58Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </amplify-responsive-grid>
</docs-container>
<docs-container
  class="background-color-off-white"
  inner-class="padding-bottom-lg padding-top-lg padding-horizontal-md"
>
  <h4 class="text-align-center">Explore Features</h4>
  <inline-fragment src="~/fragments/features-grid.md"></inline-fragment>
</docs-container>
<docs-link-banner></docs-link-banner>
<docs-footer></docs-footer>
