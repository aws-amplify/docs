module.exports = {
  /**
   * Add deleted-assets label if count of deleted files is greater than 0
   *
   * @param {Object} obj - Object parameters
   * @param {String} obj.artifactName - Name of artifiact file to check
   * @param {String} obj.label - Label to add to PR when deleted files are found from the specified paths
   */
  addLabelForDeletedFiles: async ({
    github,
    context,
    fs,
    core,
    artifactName,
    label
  }) => {
    const {
      payload: {
        repository: {
          owner: { login: ownerLogin },
          name: repoName
        }
      }
    } = context;

    const artifactContents = fs
      .readFileSync(`./${artifactName}.txt`)
      .toString();

    const [prNumberStr, numOfDeletedFilesStr] = artifactContents
      .split('\n')
      .map((str) => str.trim());

    console.log('PR number that triggered workflow:', prNumberStr);
    console.log('Number of deleted files:', numOfDeletedFilesStr);

    if (
      /^[1-9]\d*$/.test(prNumberStr) &&
      /^(0|[1-9]\d*)$/.test(numOfDeletedFilesStr)
    ) {
      const prNumber = Number(prNumberStr);
      const numOfDeletedFiles = Number(numOfDeletedFilesStr);

      if (numOfDeletedFiles > 0) {
        github.rest.issues.addLabels({
          owner: ownerLogin,
          repo: repoName,
          issue_number: prNumber,
          labels: [label]
        });
      }
    } else {
      core.setFailed(`Unable to parse ${artifactName}.txt`);
    }
  }
};
