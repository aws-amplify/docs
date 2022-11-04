# Amplify Documentation

[![DiscordChat](https://img.shields.io/discord/308323056592486420?logo=discord")](https://discord.gg/amplify)

> https://docs.amplify.aws

## Getting Started

1. [Fork this repo](/fork).
2. `yarn && yarn dev`
3. <http://localhost:3000/> should open automatically.

## Contributing

We welcome contributions to the documentation site! Please verify your changes locally followed by a PR against our `main` branch. After your PR is reviewed and all tests pass, it will be merged and the branch will be deleted.

### Branches

- `main` - at parity with our production site https://docs.amplify.aws/
- `gh-pages` - used to handle redirects from v1 of the documentation site. This should not be deleted.

## Authoring Pages

Below is a full description of how to author pages. For now though, trigger the `dev` script (`yarn dev`).

Docs are generated using [Next.js](https://nextjs.org/), please refer to their docs on how to create [pages](https://nextjs.org/docs/basic-features/pages) as a primer.

The root-level `src` folder is the only directory you need touch in order to CRUD pages.

Within this folder exists a `pages/index.tsx` file. This will be rendered as a page at the route `/`. Within the `src/pages/lib/q/platform/` folder is a `[platform].mdx` file, which will be rendered as a page at the route `/lib`.

In order to have the page render properly and display in the sidebar, please place your page and it's route in `src/directory/directory.js`

IMPORTANT: every page has to have a `title` and `description` meta field.

The markdown body is parsed as [MDX](https://mdxjs.com/) and can include any valid HTML or JSX.

To inline fragments, and have them conditionally render based off selected platform, we add the condition to the `Fragments` tag:

```jsx
import js from "/src/fragments/lib/datastore/js/conflict.mdx";

<Fragments fragments={{js: js}} />;
```

This fragment would exist in: `pages/src/fragments/lib/datastore/js/conflict.mdx`

### Tab-switchable Blocks

`BlockSwitcher` allows you to organize blocks of content into tabs. This is useful for presenting a reader different instructions based upon framework (e.g. Vue.js vs. React) or language (e.g. Java vs. Kotlin). Here's an example of its usage:

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

## Debug Client side code with browser developer tools

### Prerequisites
- [React Dev Tools](https://reactjs.org/tutorial/tutorial.html#developer-tools) 
    - [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### To debug
1. Setup the repo and run it with the `dev` script mentioned above in the "Getting Started" section
2. On your localhost page, go to the page with the React component you want to debug and open up the developer tools.
3. To know which source file to breakpoint on, we need to find the name of the component first.
    - Open up the dev tools and use the react dev tools to find the component. Do this by using the "Select an element on the page to inspect it" tool under the "Components" tab.

    - Search for the variable/component name inside the source code to find the file you want to debug.

    - Place the breakpoint inside the file under the "Sources" tab in the browser's dev tools.
        - Note that since the Amplify Docs site is built with nextjs, file paths will start with "`webpack://_N_E/./`"
4. Refresh your localhost site and the breakpoint should hit in the browser's dev tools. You should be able to debug the code.

Another way to find which file you want to debug is to search for strings/paragraphs seen in Amplify docs site. Search for the strings in your code editor and you'll find that they will be in a `.mdx` file. You should see the components that are being rendered and be able to find the file name you want to debug.


More info on debugging can be find here: https://nextjs.org/docs/advanced-features/debugging
