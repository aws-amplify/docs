import {Component, Host, h} from "@stencil/core";
import {createVNode} from "../../utils/hyperscript";

@Component({tag: "docs-story-page", shadow: false})
export class DocsStory {
  render() {
    const tag = window.location.pathname.split("/").pop();
    const child = tag && createVNode(`${tag}-story`, null);
    return <Host>{child}</Host>;
  }
}
