export const createIssueLink = () => {
  return `https://github.com/aws-amplify/docs/issues/new?title=[Feedback]FEEDBACK_TITLE_HERE&body=${encodeURI(
    `**Page**: [\`${location.pathname}\`](${location.href})

**Feedback**:\n\n<!-- your feedback here -->
`,
  )}`;
};
