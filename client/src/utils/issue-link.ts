const getLabelForPath = () => {
  const {pathname} = location;

  if (pathname.startsWith("/cli")) {
    return "CLI";
  } else if (pathname.startsWith("/ui") || pathname.startsWith("/ui-legacy")) {
    return "UI";
  } else if (pathname.startsWith("/lib") && pathname.includes("platform/js")) {
    return "JavaScript";
  } else if (
    pathname.startsWith("/lib") &&
    pathname.includes("platform/android")
  ) {
    return "Android Lib";
  } else if (pathname.startsWith("/lib") && pathname.includes("platform/ios")) {
    return "iOS Lib";
  } else if (
    pathname.startsWith("/sdk") &&
    pathname.includes("platform/android")
  ) {
    return "Android SDK";
  } else if (pathname.startsWith("/sdk") && pathname.includes("platform/ios")) {
    return "iOS SDK";
  } else if (pathname.includes("start/")) {
    return "Getting Started";
  } else {
    return "";
  }
};

export const createIssueLink = () => {
  const NEW_GITHUB_ISSUE_LINK =
    "https://github.com/aws-amplify/docs/issues/new";
  const params = [
    "title=[Feedback]FEEDBACK_TITLE_HERE",
    `labels=${encodeURIComponent(getLabelForPath())}`,
    `body=${encodeURIComponent(
      `**Page**: [\`${location.pathname}\`](${location.href})\n\n**Feedback**:\n\n<!-- your feedback here -->`,
    )}`,
  ];
  return `${NEW_GITHUB_ISSUE_LINK}?${params.join("&")}`;
};
