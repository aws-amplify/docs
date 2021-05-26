import {Component, h, Host, Prop} from "@stencil/core";
import {repoActionsStyle} from "./repo-actions.style";
import {Page} from "../../api";
import {createIssueLink} from "../../utils/issue-link";

@Component({tag: "docs-repo-actions", shadow: false})
export class DocsRepoActions {
  /*** the page from which a subpath can be attained */
  @Prop() readonly page?: Page;

  render() {
    return (
      <Host class={repoActionsStyle}>
        <amplify-external-link href={createIssueLink()}>
          <img src="/assets/flag.svg" alt="Feedback" />
          Feedback
        </amplify-external-link>
        <amplify-external-link
          href={`https://github.com/aws-amplify/docs/edit/main/docs/${this.page?.relativeToContentDir}`}
        >
          <img src="/assets/github.svg" alt="Edit" />
          Edit
        </amplify-external-link>
      </Host>
    );
  }
}
