import {Component, h, Host, Prop} from "@stencil/core";
import {repoActionsStyle} from "./repo-actions.style";
import {Page} from "../../api";
import {createIssueLink} from "../../utils/issue-link";
import {FLAG, EDIT} from "../../constants/img";

@Component({tag: "docs-repo-actions", shadow: false})
export class DocsRepoActions {
  /*** the page from which a subpath can be attained */
  @Prop() readonly page?: Page;

  render() {
    return (
      <Host class={repoActionsStyle}>
        <amplify-external-link href={createIssueLink()}>
          <img {...FLAG} />
          Feedback
        </amplify-external-link>
        <amplify-external-link
          href={`https://github.com/aws-amplify/docs/edit/master/docs/${this.page?.relativeToContentDir}`}
        >
          <img {...EDIT} />
          Edit
        </amplify-external-link>
      </Host>
    );
  }
}
