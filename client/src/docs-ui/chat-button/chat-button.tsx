import {Component, h} from "@stencil/core";
import {discordChatStyle, logoStyle} from "./chat-button.style";
import {DISCORD} from "../../constants/links";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href={DISCORD}
        class={discordChatStyle}
        graphic="white"
      >
        <img
          alt="discord logo"
          src="/assets/discord-white.svg"
          class={logoStyle}
        />
        Open Chat
      </amplify-external-link>
    );
  }
}
