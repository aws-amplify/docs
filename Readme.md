# Amplify Documentation

[![DiscordChat](https://img.shields.io/discord/308323056592486420?logo=discord")](https://discord.gg/amplify)

> https://docs.amplify.aws

### Prerequisites

- [Node.js 16.14.0 or later](https://nodejs.org/en/)
- [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Set up the docs repo

1. [Fork this repo](/fork) and `git clone` it.
2. In your terminal, navigate to the repo from where it was just cloned. This should be located at the `/docs` directory.
2. From your command line, run `yarn && yarn dev`.
3. <http://localhost:3000/> should open automatically.

## How to contribute

We welcome contributions to the documentation site! Here's how to do it:

1. Follow our [styleguide](https://github.com/aws-amplify/docs/blob/main/STYLEGUIDE.md), especially if writing longer pieces.
2. Verify your changes locally. 
3. Make a PR to our `main` branch.
    1. Please include any [issues](https://github.com/aws-amplify/docs/issues) your PR addresses.
    2. If any files have been deleted with your PR, please indicate that `redirects are needed` in your PR description and/or add the `redirects-needed` label.

**What's next?** After your PR is reviewed and all tests pass, it will be merged and the branch will be deleted.

### Branches

- **main** - at parity with our production site [docs.amplify.aws](https://docs.amplify.aws/)
- **gh-pages** - DO NOT DELETE! Handle redirects from v1 of the documentation site.

## Authoring pages

Our docs are generated using [Next.js](https://nextjs.org/). Refer to their docs on [how to create pages](https://nextjs.org/docs/basic-features/pages) as a primer.

The pages' source are in **src**. This folder is the only directory you need to touch to edit or create pages.

Within this folder exists a **pages/index.tsx** file. This will be rendered as a page at the route **/**. Within the **pages/lib/q/platform/** folder is a **[platform].mdx** file, which will be rendered as a page at the route **/lib**.

To have the page render properly and display in the sidebar, place your page and its route in **src/directory/directory.js**.

IMPORTANT: Every page has to have a `title` and `description` meta field.

The markdown body is parsed as [MDX](https://mdxjs.com/) and can include any valid HTML or JSX.

### Fragments
To incorporate new platform-specific content within a page, please use [Inline Filters](https://github.com/aws-amplify/docs/blob/main/Readme.md#inline-filters).

When editing content that hasn't been migrated, you may see the following pattern:

```jsx
import js from "/src/fragments/lib/datastore/js/conflict.mdx";

<Fragments fragments={{js: js}} />;
```

This pattern incorporates fragment files into a page and conditionally renders content based off selected platform added as a condition to the `Fragments` tag.

This fragment would exist in: `pages/src/fragments/lib/datastore/js/conflict.mdx`

### Inline Filters 

We are incorporating the use of `<InlineFilters>` to add platform-specific content within the context of one page rather than in fragments. These filters allow you to still specify content by platform and they reference platforms using the same naming convention as our fragments. You can enclose your platform-specific content by updating the opening tag:

````md
<InlineFilter filters={["js", "react-native", "android", "ios", "flutter"]}>

</InlineFilter>
````
 
If you are updating content on a page, please note any inline filter tags which may be indicating a specific platform as you make your edits.

### Accordion 

`Accordion` This single-use accordion hides peripheral content until the reader selects to expand the section. This helps you keep your pages focused on the need-to-know information upfront, while also providing readers an option to dive deeper when they choose. These accordions can provide peripheral content such as additional context for beginners, advanced deep dives for those who want to off-road, and troubleshooting guidance for errors users may encounter.

Here is an example of its usage:

````md
<Accordion title='Review recommended accordion usage' headingLevel='4' eyebrow='Learn more'>

- Title – Make your title descriptive to help readers know what the accordion contains before they click.
- Heading Level – Keep the heading level consistent with your page hierarchy.
- Eyebrow – Update this text to reflect the purpose of the accordion. We recommend:
    - Learn more – used to add additional context that is not needed upfront but is useful for users to review when they choose.
    - Troubleshooting – used when adding details to troubleshoot specific errors within context.
    - Walkthrough – used when adding a step-by-step example for those who need more direct guidance.

</Accordion>
````

### Tab-switchable Blocks

`BlockSwitcher` allows you to organize blocks of content into tabs. This is useful for presenting a reader different instructions based upon framework (e.g., Vue.js vs. React) or language (e.g., Java vs. Kotlin). Here's an example of its usage:

````md
<BlockSwitcher>

<Block name="JavaScript">

```js
const a = "a";
```

</Block>

<Block name="TypeScript">

```ts
const a: "a" = "a";
```

</Block>

<Block name="Rust">

```rust
let mut a = String::from("a");
```

</Block>

</BlockSwitcher>
````

## Debug client-side code with browser developer tools

### Prerequisites
- [React Dev Tools](https://reactjs.org/tutorial/tutorial.html#developer-tools) 
    - [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### To debug
1. Set up the repo and run it with the `dev` script mentioned above in the "Getting Started" section.
2. On your localhost page, go to the page with the React component you want to debug and open up the developer tools.
3. To know which source file to breakpoint on, we need to find the name of the component first.
    - Open up the dev tools and use the react dev tools to find the component. Do this by using the "Select an element on the page to inspect it" tool under the "Components" tab.

    - Search for the variable/component name inside the source code to find the file you want to debug.

    - Place the breakpoint inside the file under the "Sources" tab in the browser's dev tools.
        - Note that since the Amplify Docs site is built with nextjs, file paths will start with "`webpack://_N_E/./`"
4. Refresh your localhost site and the breakpoint should hit in the browser's dev tools. You should be able to debug the code.

Another way to find which file you want to debug is to search for strings/paragraphs seen in Amplify docs site. Search for the strings in your code editor and you'll find that they will be in a `.mdx` file. You should see the components that are being rendered and be able to find the file name you want to debug.


More info on debugging can be found here: https://nextjs.org/docs/advanced-features/debugging
