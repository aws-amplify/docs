module.exports = {
  getAddedFragments: ({ github, context, core }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    // Use the Github API to query for the list of files from the PR
    return github.paginate(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
      { owner, repo, pull_number: issue_number },
      (response) => {
        const newFragments = [];
        response.data.forEach((file) => {
          if (
            file.status === 'added' &&
            file.filename.startsWith('src/fragments')
          ) {
            newFragments.push(file);
          }
        });
        return newFragments.length;
      }
    );
  },

  addComment: async ({ github, context }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    const useInlineFiltersComment =
      'Amplify Docs is moving away from the use of Fragments. Please instead use InlineFilter. See our [README](https://github.com/aws-amplify/docs/blob/main/Readme.md#inline-filters) for more information.';
    github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: useInlineFiltersComment
    });
  }
};
