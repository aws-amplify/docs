import {Component, h} from "@stencil/core";
import {discordChatStyle} from "./chat-button.style";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href="https://discord.gg/jWVbPfC"
        class={discordChatStyle}
        graphic="white"
      >
        <img
          alt="Discord Icon"
          height={25}
          src="../../assets/icon/discord-logo.png"
        />
        Open Chat
      </amplify-external-link>
    );
  }
}
