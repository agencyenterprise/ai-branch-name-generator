import * as vscode from 'vscode'

export function useBranch(branchName: string) {
  const copyBranchName = 'Copy'
  const createBranch = 'Create'

  const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports

  if (gitExtension.getAPI(1).repositories.length > 0) {
    vscode.window
      .showInformationMessage(`Would you like to copy the name or create "${branchName}"?`, copyBranchName, createBranch)
      .then((selection) => {
        if (selection === copyBranchName) {
          vscode.env.clipboard.writeText(branchName)
        } else if (selection === createBranch) {
          vscode.env.clipboard.writeText(branchName)

          vscode.window.showInformationMessage('Do you want to checkout this branch?', 'Yes', 'No').then((checkoutSelection) => {
            const api = gitExtension.getAPI(1)
            const repository = api.repositories[0]

            repository.createBranch(branchName, checkoutSelection === 'Yes')
          })
        }
      })
  } else {
    vscode.window.showInformationMessage(branchName, copyBranchName).then(() => {
      vscode.env.clipboard.writeText(branchName)
    })
  }
}
