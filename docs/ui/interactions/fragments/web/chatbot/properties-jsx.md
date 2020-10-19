<!-- TODO: replace this in favor of <ui-component-props /> -->

## Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `botName` | Name of the bot | `string` | `undefined` |
| `botTitle` | Text placed in the top header | `string` | "ChatBot Lex" |
| `clearOnComplete` | Clear messages when conversation finishes | `boolean` | `false` |
| `conversationModeOn` | Continue listening to users after they send the message | `boolean` | `false` |
| `silenceThreshold` | Noise threshold between -1 and 1. Anything below is considered a silence. | `number` | `0.2` |
| `silenceTime` | Amount of silence (in ms) to wait for | `number` | `1500` |
| `textEnabled` | Whether text chat is enabled | `boolean` | `true` |
| `voiceEnabled` | Whether voice chat is enabled | `boolean` | `false` |
| `welcomeMessage` | Greeting message displayed to users | `string` | `undefined` |
