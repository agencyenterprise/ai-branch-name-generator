import * as vscode from 'vscode'
import { createBranch as createBranchName } from './create-branch-name'
import { useBranch } from './use-branch'

const platforms = {
  pivotal: 'Pivotal',
}

export const showUserPrompt = async () => {
  const quickPick = vscode.window.createQuickPick()

  quickPick.items = Object.values(platforms).map((platform) => ({ label: platform }))

  quickPick.onDidChangeSelection(async (selection) => {
    const selectedLabel = selection[0].label

    if (selectedLabel === platforms.pivotal) {
      const branchName = await createBranchName({ platform: platforms.pivotal })

      useBranch(branchName)
    }
  })

  quickPick.onDidHide(() => quickPick.dispose())

  quickPick.show()
}
