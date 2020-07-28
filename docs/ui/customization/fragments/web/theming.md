Theming for the UI components can be achieved by using CSS Variables. You can enable theming in your app by overriding the below mentioned CSS variable values. To do that, add the following code in root css file.

```
:root {
  --amplify-primary-color: #ff6347;
  --amplify-primary-tint: #ff7359;
  --amplify-primary-shade: #e0573e;
}
```

## Supported CSS Custom properties

### For Typography

| Custom Properties           | Default Value                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `--amplify-font-family`     | 'Amazon Ember', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif' |
| `--amplify-text-xxs`        | 0.75rem                                                                                      |
| `--amplify-text-xs`         | 0.81rem                                                                                      |
| `--amplify-text-sm`         | 0.875rem                                                                                     |
| `--amplify-text-md`         | 1rem                                                                                         |
| `--amplify-text-lg`         | 1.5rem                                                                                       |
| `--amplify-text-xl`         | 2rem                                                                                         |
| `--amplify-text-xxl`        | 2.5rem                                                                                       |

### For Colors

| Custom Properties              | Default Value        |
| ------------------------------ | -------------------- |
| `--amplify-primary-color`      | #ff9900              |
| `--amplify-primary-contrast`   | var(--amplify-white) |
| `--amplify-primary-tint`       | #ffac31              |
| `--amplify-primary-shade`      | #e88b01              |
| `--amplify-secondary-color`    | #152939              |
| `--amplify-secondary-contrast` | var(--amplify-white) |
| `--amplify-secondary-tint`     | #31465f              |
| `--amplify-secondary-shade`    | #1F2A37              |
| `--amplify-tertiary-color`     | #5d8aff              |
| `--amplify-tertiary-contrast`  | var(--amplify-white) |
| `--amplify-tertiary-tint`      | #7da1ff              |
| `--amplify-tertiary-shade`     | #537BE5              |
| `--amplify-grey`               | #828282              |
| `--amplify-light-grey`         | #c4c4c4              |
| `--amplify-white`              | #ffffff              |
| `--amplify-red`                | #dd3f5b              |


## Managing Layout

Since the UI components are implemented using web components, you can control the top level `amplify-authenticator` component directly to define it's positioning using CSS.

```css
/* Center the AmplifyAuthenticator component */
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
```