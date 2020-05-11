import {Component, h} from "@stencil/core";
import {discordChatStyle, logoStyle} from "./chat-button.style";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href="https://discord.gg/jWVbPfC"
        class={discordChatStyle}
        graphic="white"
      >
        <img src="/assets/discord-white.svg" class={logoStyle} />
        Open Chat
      </amplify-external-link>
    );
  }
}
