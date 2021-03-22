import {Component, State, Watch, h, Build} from "@stencil/core";
import {tocContext} from "../toc.context";
import {SetContent} from "../toc.types";
import {headingIsVisible} from "../../../utils/heading-is-visible";

@Component({tag: "amplify-toc-provider", shadow: false})
export class AmplifyTOCProvider {
  /** The slot within `amplify-toc-content` */
  @State() content?: HTMLElement;
  /** Extracted, visible h2 & h3s within `this.content` */
  @State() elements?: HTMLElement[];

  observer?: MutationObserver;

  setContent: SetContent = (content: HTMLElement) => (this.content = content);

  setElements = () => {
    if (this.content) {
      this.elements = Array.from(
        this.content.querySelectorAll("h2, h3"),
      ).filter((e) => headingIsVisible(e)) as HTMLElement[];
    }
  };

  @Watch("content")
  bindToContent() {
    this.setElements();
    if (this.observer) this.observer.disconnect();
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.setElements);
      this.content &&
        this.observer.observe(this.content, {
          childList: true,
          attributes: true,
          subtree: true,
        });
    }
  }

  componentDidUnload() {
    this.observer?.disconnect();
  }

  render() {
    return (
      <tocContext.Provider
        state={{
          elements: this.elements,
          setContent: this.setContent,
        }}
      >
        <slot />
      </tocContext.Provider>
    );
  }
}
