module.exports = {
  /**
   * Get deleted files from pull request
   *
   * @param {Object} obj - Object for parameters
   * @param {string[]} obj.paths - Array of paths to look for deleted files
   */
  getDeletedFilesFromPR: async ({ github, context, paths }) => {
    const {
      issue: { number: issue_number },
      repo: { owner, repo }
    } = context;

    const deletedFiles = await github.paginate(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
      { owner, repo, pull_number: issue_number },
      (response) =>
        response.data
          .filter((file) => file.status === 'removed')
          .filter((file) =>
            paths.some((path) => file.filename.startsWith(path))
          )
    );

    console.log('Deleted file count: ', deletedFiles.length);
    console.log(
      'Deleted files: ',
      deletedFiles.map((file) => file.filename)
    );

    return deletedFiles.length;
  },
  /**
   * Get artifact from parent workflow and save it to the workspace path
   *
   * @param {Object} obj - Object for parameters
   * @param {string} obj.artifactName - Name of artifact file to get
   * @param {string} obj.workspace - The github workflow workspace path to save the downloaded artifact to
   */
  getArtifact: async ({ github, context, fs, artifactName, workspace }) => {
    const {
      payload: {
        repository: {
          owner: { login: ownerLogin },
          name: repoName
        },
        workflow_run: { id: workflowRunId }
      }
    } = context;

    const artifacts = await github.rest.actions.listWorkflowRunArtifacts({
      owner: ownerLogin,
      repo: repoName,
      run_id: workflowRunId
    });

    const matchArtifact = artifacts.data.artifacts.find((artifact) => {
      return artifact.name == artifactName;
    });

    const download = await github.rest.actions.downloadArtifact({
      owner: ownerLogin,
      repo: repoName,
      artifact_id: matchArtifact.id,
      archive_format: 'zip'
    });

    fs.writeFileSync(
      `${workspace}/${artifactName}.zip`,
      Buffer.from(download.data)
    );
  }
};
