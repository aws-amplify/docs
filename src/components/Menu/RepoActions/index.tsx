import React from "react";
import ExternalLink from "../../ExternalLink";
import {RepoActionsStyle} from "./styles";

const getLabelForPath = (path) => {
  if (path.startsWith("/cli")) {
    return "CLI";
  } else if (path.startsWith("/ui") || path.startsWith("/ui-legacy")) {
    return "UI";
  } else if (path.startsWith("/lib") && path.includes("platform/js")) {
    return "JavaScript";
  } else if (path.startsWith("/lib") && path.includes("platform/android")) {
    return "Android Lib";
  } else if (path.startsWith("/lib") && path.includes("platform/ios")) {
    return "iOS Lib";
  } else if (path.startsWith("/sdk") && path.includes("platform/android")) {
    return "Android SDK";
  } else if (path.startsWith("/sdk") && path.includes("platform/ios")) {
    return "iOS SDK";
  } else if (path.includes("start/")) {
    return "Getting Started";
  } else {
    return "";
  }
};

function createIssueLink(path, href) {
  href = `docs.amplify.aws${href}`;
  const NEW_GITHUB_ISSUE_LINK =
    "https://github.com/aws-amplify/docs/issues/new";
  const params = [
    "title=[Feedback]FEEDBACK_TITLE_HERE",
    `labels=${encodeURIComponent(getLabelForPath(path))}`,
    `body=${encodeURIComponent(
      `**Page**: [\`${path}\`](${href})\n\n**Feedback**:\n\n<!-- your feedback here -->`,
    )}`,
  ];
  return `${NEW_GITHUB_ISSUE_LINK}?${params.join("&")}`;
}

function createEditLink(path) {
  const safePath = path
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  return `https://github.com/aws-amplify/docs/edit/main/src/pages${safePath}.mdx`;
}

export default function RepoActions({path, href}) {
  const feedbackLink = createIssueLink(path, href);
  const editLink = createEditLink(path);
  return (
    <RepoActionsStyle>
      <ExternalLink href={feedbackLink}>
        <img src="/assets/flag.svg" alt="Feedback" />
        Feedback
      </ExternalLink>
      <ExternalLink href={editLink}>
        <img src="/assets/github.svg" alt="Edit" />
        Edit
      </ExternalLink>
    </RepoActionsStyle>
  );
}
