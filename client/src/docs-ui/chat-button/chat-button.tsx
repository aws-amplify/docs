import {Component, h} from "@stencil/core";
import {discordChatStyle, logoStyle} from "./chat-button.style";
import {DISCORD as DISCORD_LINK} from "../../constants/links";
import {DISCORD as DISCORD_IMG} from "../../constants/img";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href={DISCORD_LINK}
        class={discordChatStyle}
        graphic="white"
      >
        <img
          class={logoStyle}
          alt={DISCORD_IMG.alt}
          src={DISCORD_IMG.lightSrc}
        />
        Open Chat
      </amplify-external-link>
    );
  }
}
