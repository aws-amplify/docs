---
title: Customizing CSS
description: Managing the layout and styling of Components
---

You can control top level components directly using CSS. For instance, to control the layout of the `amplify-authenticator`, we can specify the properties directly inside of its selector.

```css
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
```