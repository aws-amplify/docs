import ExternalLink from '../../ExternalLink';
import { RepoActionsStyle } from './styles';

const getLabelForPath = (path) => {
  if (path.startsWith('/cli')) {
    return 'CLI';
  } else if (path.startsWith('/ui') || path.startsWith('/ui-legacy')) {
    return 'UI';
  } else if (path.startsWith('/lib') && path.includes('platform/js')) {
    return 'JavaScript';
  } else if (path.startsWith('/lib') && path.includes('platform/android')) {
    return 'Android Lib';
  } else if (path.startsWith('/lib') && path.includes('platform/ios')) {
    return 'iOS Lib';
  } else if (path.startsWith('/sdk') && path.includes('platform/android')) {
    return 'Android SDK';
  } else if (path.startsWith('/sdk') && path.includes('platform/ios')) {
    return 'iOS SDK';
  } else if (path.includes('start/')) {
    return 'Getting Started';
  } else {
    return '';
  }
};

function createIssueLink(directoryPath, url) {
  url = `https://docs.amplify.aws${url}`;
  const NEW_GITHUB_ISSUE_LINK =
    'https://github.com/aws-amplify/docs/issues/new';
  const params = [
    'title=[Feedback]FEEDBACK_TITLE_HERE',
    `labels=${encodeURIComponent(getLabelForPath(directoryPath))}`,
    `body=${encodeURIComponent(
      `**Page**: [\`${directoryPath}\`](${url})\n\n**Feedback**:\n\n<!-- your feedback here -->`
    )}`
  ];
  return `${NEW_GITHUB_ISSUE_LINK}?${params.join('&')}`;
}

function createEditLink(directoryPath) {
  // hardcoded links for pages that exist in the directory as .../index.mdx
  if (directoryPath === '/cli') directoryPath = '/cli/index';
  if (directoryPath === '/cli/function') directoryPath = '/cli/function/index';
  if (directoryPath === '/console') directoryPath = '/console/index';
  const safePath = directoryPath
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `https://github.com/aws-amplify/docs/edit/main/src/pages${safePath}.mdx`;
}

export default function RepoActions({ directoryPath, url }) {
  const feedbackLink = createIssueLink(directoryPath, url);
  const shouldShowEditLink = directoryPath !== '/ChooseFilterPage';
  const editLink = createEditLink(directoryPath);
  return (
    <RepoActionsStyle>
      <ExternalLink href={feedbackLink}>
        <img src="/assets/flag.svg" alt="" />
        <span aria-label="Leave feedback for this page on GitHub">
          Feedback
        </span>
      </ExternalLink>
      {shouldShowEditLink && (
        <ExternalLink href={editLink}>
          <img src="/assets/github.svg" alt="" />
          <span aria-label="Edit this page on GitHub">Edit</span>
        </ExternalLink>
      )}
    </RepoActionsStyle>
  );
}
