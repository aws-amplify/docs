# Amplify Framework Documentation

[![DiscordChat](https://img.shields.io/discord/308323056592486420?logo=discord")](https://discord.gg/jWVbPfC)

> https://docs.amplify.aws

## Getting Started

1. [Fork this repo](/fork).
2. `yarn && yarn start`
3. <http://localhost:3333/> should open automatically.

## Contributing 

We welcome contributions to the documentation site! Please verify your changes locally followed by a PR against our `main` branch. After your PR is reviewed and all tests pass, it will be merged and the branch will be deleted. 

### Branches 

- `main` - at parity with our production site https://docs.amplify.aws/
- `gh-pages` - used to handle redirects from v1 of the documentation site. This should not be deleted.

## Authoring Pages

Below is a full description of how to author pages. For now though, trigger the `start` script (`yarn start`).

The root-level `docs` folder is the only directory you need touch in order to CRUD pages.

Within this folder exists a `docs.md` file. This will be rendered as a page at the route `/`. Within the `docs/lib` folder is a `lib.md` file, which will be rendered as a page at the route `/lib`. For these 1st and 2nd level pages, there're three properties to keep in mind:

- page file names match the parent folder name
- the route at which the page will be accessible is determined by the relative path between the top-level `docs` folder and a page's markdown file.

Within the second-level page's folder, you might see other markdown files, along with a `menu.json`. The `menu.json` should contain an `items` property, which is an array of file names (without extension). These file names should represent––in order––the 3rd-level pages, which are strewn aside the given 2nd-level page (`docs/lib/lib.md`, for instance).

IMPORTANT: every page has to have a `title` and `description` frontmatter field.

The markdown body can include any valid HTML, although this is ill-advised, unless it's to embed an example from [Amplify UI](https://github.com/aws-amplify/amplify-js/tree/main/packages/amplify-ui). It's also important to note that objects (passed via attributes) are not valid in HTML (only in JSX). Another note: be careful––when embedding HTML in markdown––to not make use of non-standard self-closing tags (standard self-closing tags include area, base, br, col, command, embed, hr, img, input, keygen, param, source, track and wbr).

Let's go ahead and create some new pages. Let's say we want to create pages for the auth category. We update the current directory structure...

... from this:

```
docs/
  docs.md
  lib/
    lib.md
```

... to this:

```diff
docs/
  docs.md
  lib/
    lib.md
+   auth/
+     overview.md
+     menu.json
+   menu.json
```

Our `docs/lib/menu.json` should reference the newly-created folder at `docs/lib/auth/`:

`docs/lib/menu.json`

```json
{
  "items": ["auth"]
}
```

Our `docs/lib/auth/menu.json` should reference the newly-created page at `docs/lib/auth/overview.md`, as well as provide a title for this group.

```json
{
  "title": "Authentication",
  "items": ["overview"]
}
```

Our `docs/lib/auth/overview.md` can look like this for now:

```md
---
title: Authentication
description: verify user identity
---

# Hi
```

This page will result in a route of `/lib/auth/overview`

Now let's take a step back and add content to `docs/lib/auth/overview.md`:

```diff
---
title: Authentication
description: verify user identity
---

- # Hi
+ AWS Amplify Authentication module provides Authentication APIs and building blocks for developers who want to create user authentication experiences.
```

As a convention for better organization, we'll be extracting all page contents into standalone "fragments". Let's do this with the "AWS Amplify Authentication module..." section from above.

```diff
docs/
  docs.md
  lib/
    lib.md

    auth/
      overview.md
      menu.json
+     fragments/
+       summary.md
    menu.json
```

Now, within the `docs/lib/auth/overview.md` file, let's update the body with the fragment's usage:

```diff
---
title: Authentication
description: verify user identity
---

- AWS Amplify Authentication module provides Authentication APIs and building blocks for developers who want to create user authentication experiences.
+ <inline-fragment src="~/docs/lib/auth/fragments/summary.md"></inline-fragment>
```

When it comes to writing cross-platform pages. we do something similar to the above. As an example, let's shape the `docs/lib/auth/overview/overview.md` page (with the resulting route of `/lib/auth/overview`). Within this page, we'll want to render out different content depending on the user's selected platform. Let's add the platform-specific content to the file tree:

```diff
docs/
  docs.md
  lib/
    lib.md
    auth/
      overview.md
      fragments/
        summary.md
+       fragments/
+         ios/
+           automated.md
+         web/
+           automated.md
```

To inline these fragments, and have them conditionally render based off selected platform, we add the condition to the `inline-fragment` tag:

`docs/lib/auth/setup/setup.md`

```md
---
title: Authentication Setup
description: how to configure auth
---

<inline-fragment platform="ios" src="~/docs/lib/auth/setup/fragments/ios/automated.md"></inline-fragment> <inline-fragment platform="web" src="~/docs/lib/auth/setup/fragments/web/automated.md"></inline-fragment>
```

### Inlining Filterable Content

`docs-filter` allows you to make some content filterable without needing to place that content in its own fragment file. This is useful for smaller, non-reusable snippets.

For instance:

```md
<docs-filter platform="js">

Some JS-specific content here

</docs-filter>
```

### Tab-switchable Blocks

`amplify-block-switcher` allows you to organize blocks of content into tabs. This is useful for presenting a reader different instructions based upon framework (e.g. Vue.js vs. React) or language (e.g. Java vs. Kotlin). Here's an example of its usage:

````md
<amplify-block-switcher>

<amplify-block name="JavaScript">

```js
const a = "a";
```

</amplify-block>

<amplify-block name="TypeScript">

```ts
const a: "a" = "a";
```

</amplify-block>

<amplify-block name="Rust">

```rust
let mut a = String::from("a");
```

</amplify-block>

</amplify-block-switcher>
````

### Adding to Valid Tag List

Markdown parsers don't handle `<whatever>` very well. If you intended to write what the parser interprets as usage of an element / web component, navigate to `capi/src/init-node/valid-tags.json` and add a new entry for your tag. If you meant for `<whatever>` to be text, you'll need to escape it with a backslash (`\<whatever\>`). Please confirm that this renders properly before PRing with your changes.
