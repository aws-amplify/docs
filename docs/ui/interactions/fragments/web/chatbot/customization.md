## Customization

### Slots

`amplify-chatbot` provides the following [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

| Name     | Description                         |
| -------- | ----------------------------------- |
| `Header` | Content placed at the top of the UI |

### Custom CSS Properties

`amplify-chatbot` provides the following CSS properties to modify the style at component level.

| Name | Description | Default value |
| --- | --- | --- |
| `--width` | Width of ChatBot | `28.75rem` |
| `--height` | Height of ChatBot | `37.5rem` |
| `--header-color` | Header text color | `--amplify-secondary-color` |
| `--header-size` | Header text size | `--amplify-text-lg` |
| `--bot-background-color` | Background color of bot messages | `rgb(230, 230, 230)` |
| `--bot-text-color` | Text color of bot messages | `black` |
| `--bot-dot-color` | Base color of bot message loading animation | `var(--bot-background-color)` |
| `--user-background-color` | Background color of user messages | `var(--amplify-blue)` |
| `--user-text-color` | Text color of user messages | `var(--amplify-white)` |
| `--user-dot-color` | Base color of user message loading animation | `var(--user-background-color)` |

```css
amplify-chatbot {
  --width: 30rem;
  --height: 40rem;
}
```
