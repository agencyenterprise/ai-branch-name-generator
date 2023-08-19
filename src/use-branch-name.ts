import { env, extensions, window } from 'vscode'

export const useBranchName = (branchName: string) => {
  const gitExtension = extensions.getExtension('git')?.exports
  const areThereGitRepositories = gitExtension?.getAPI(1).repositories.length > 0
  const copyBranchNameLabel = 'Copy'
  const createBranchLabel = 'Create'

  if (areThereGitRepositories) {
    window
      .showInformationMessage(
        `Would you like to copy or to create the branch "${branchName}"?`,
        copyBranchNameLabel,
        createBranchLabel,
      )
      .then((selection) => {
        if (selection === copyBranchNameLabel) {
          env.clipboard.writeText(branchName)
        } else if (selection === createBranchLabel) {
          env.clipboard.writeText(branchName)

          window.showInformationMessage(`Would you like to checkout "${branchName}"?`, 'Yes', 'No').then((checkoutSelection) => {
            const api = gitExtension.getAPI(1)
            const repository = api.repositories[0]

            repository.createBranch(branchName, checkoutSelection === 'Yes')
          })
        }
      })
  } else {
    window.showInformationMessage(branchName, copyBranchNameLabel).then(() => {
      env.clipboard.writeText(branchName)
    })
  }
}
