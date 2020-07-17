---
title: Translations
description: Internationalization and Custom Text
---

Customizing text and adding language translations can be done via the `I18n` module:

```js
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";

I18n.putVocabulariesForLanguage("en-US", {
  [Translations.SIGN_IN_HEADER_TEXT]: "Custom Sign In Header Text",
  [Translations.SIGN_IN_ACTION]: "Custom Click Here to Sign In"
});
```

A complete list of all translatable strings can be found in [`Translations.ts`](https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/common/Translations.ts).
