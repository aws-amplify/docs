import {Component, h} from "@stencil/core";
import {gitterChatStyle} from "./chat-button.style";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href="https://gitter.im/AWS-Amplify/Lobby"
        class={gitterChatStyle}
        graphic="white"
      >
        Open Chat
      </amplify-external-link>
    );
  }
}
