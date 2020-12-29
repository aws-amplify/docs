### handleAuthStateChange

Similar to `onAuthUIStateChange`, `handleAuthStateChange` is a function you can attach to UI components that will fire whenever the state of the UI component changes.

**Usage**

```js
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

handleAuthStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log("user successfully signed in!");
    console.log("user data: ", authData);
  }
  if (!authData) {
    console.log("user is not signed in...");
  }
});


<AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange} />
```