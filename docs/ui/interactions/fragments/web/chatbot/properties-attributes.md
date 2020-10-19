<!-- TODO: replace this in favor of <ui-component-props /> -->

## Properties

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| `bot-name` | Name of the bot | `string` | `undefined` |
| `bot-title` | Text placed in the top header | `string` | "ChatBot Lex" |
| `clear-on-complete` | Clear messages when conversation finishes | `boolean` | `false` |
| `conversation-mode-on` | Continue listening to users after they send the message | `boolean` | `false` |
| `silence-threshold` | Noise threshold between -1 and 1. Anything below is considered a silence. | `number` | `0.2` |
| `silence-time` | Amount of silence (in ms) to wait for | `number` | `1500` |
| `text-enabled` | Whether text chat is enabled | `boolean` | `true` |
| `voice-enabled` | Whether voice chat is enabled | `boolean` | `false` |
| `welcome-message` | Greeting message displayed to users | `string` | `undefined` |
