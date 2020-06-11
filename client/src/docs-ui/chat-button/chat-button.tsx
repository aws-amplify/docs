import {Component, h} from "@stencil/core";
import {discordChatStyle, logoStyle} from "./chat-button.style";
import {DISCORD as DISCORD_HREF} from "../../constants/links";
import {DISCORD as DISCORD_IMG} from "../../constants/img";

@Component({tag: "docs-chat-button", shadow: false})
export class DocsChatButton {
  render() {
    return (
      <amplify-external-link
        href={DISCORD_HREF}
        class={discordChatStyle}
        graphic="white"
      >
        <img class={logoStyle} {...DISCORD_IMG} />
        Open Chat
      </amplify-external-link>
    );
  }
}
