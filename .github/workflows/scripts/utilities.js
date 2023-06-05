module.exports = {
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
