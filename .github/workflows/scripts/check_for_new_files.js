module.exports = {
  getAddedFiles: ({ github, context, core }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    // Use the Github API to query for the list of files from the PR
    github
      .paginate(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
        { owner, repo, pull_number: issue_number },
        (response) => response.data.filter((file) => file.status === 'added')
      )
      .then((files) => {
        // Save these values to the Github env
        core.exportVariable('NEW_FILES', files);
        core.exportVariable('NEW_FILES_COUNT', files.length);

        console.log('New files: ', files);
      });
  },
  validateCodeowners: async ({ github, context, fetch, ignore }) => {
    const { NEW_FILES, CURRENT_BRANCH, CURRENT_REPO } = process.env;

    const codeownersFile = `https://raw.githubusercontent.com/${CURRENT_REPO}/${CURRENT_BRANCH}/.github/CODEOWNERS`;

    console.log('Fetching CODEOWNERS from: ', codeownersFile);

    const response = await fetch(codeownersFile);
    const body = await response.text();

    // Filter out comments from CODEOWNERS file
    const codeownersFilePatterns = body
      .split('\n')
      .filter((e) => !e.startsWith('#'))
      .filter((e) => e.length > 1)
      .map((e) => e.split(/\s+/)[0]);

    console.log(codeownersFilePatterns);

    // Add the patterns to the ignore package
    const ig = ignore().add(codeownersFilePatterns);

    const filesNotInCodeowners = [];

    JSON.parse(NEW_FILES).forEach((newFile) => {
      // Check if the file isn't covered by our list of patterns
      if (!ig.ignores(newFile.filename)) {
        console.log(`${newFile.filename} is not covered by CODEOWNERS`);
        filesNotInCodeowners.push(newFile.filename);
      }
    });

    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    console.log('New files: ', filesNotInCodeowners);

    // If we found files not covered by CODEOWNERS, then add a comment to the PR
    if (filesNotInCodeowners.length > 0) {
      const files = filesNotInCodeowners.map((e) => `- ${e}\n`).join('');

      const needCodeownersUpdateComment = `CODEOWNERS need to be updated because these new files are not covered:\n ${files}`;
      github.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body: needCodeownersUpdateComment
      });
      const labels = ['update-codeowners'];
      github.rest.issues.addLabels({ owner, repo, issue_number, labels });
    }
  }
};
