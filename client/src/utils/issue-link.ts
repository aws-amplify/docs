export const createIssueLink = () => {
  return `https://github.com/aws-amplify/docs/issues/new?title=[Feedback]&body=${encodeURI(
    `**Page**: [\`${location.pathname}\`](${location.href})

**Feedback**:\n\n<!-- your feedback here -->
`,
  )}`;
};
