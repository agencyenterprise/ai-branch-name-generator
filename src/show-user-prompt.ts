import { window } from 'vscode'
import { createBranchName } from './create-branch-name'
import { extensionConfig } from './extension-config'
import { useBranchName } from './use-branch-name'

export const showUserPrompt = async () => {
  if (extensionConfig.defaultPlatform) {
    return promptUserForBranchCreation({ selectedPlatformLabel: extensionConfig.defaultPlatform })
  }

  showPromptForPlatformSelection()
}

const promptUserForBranchCreation = async ({ selectedPlatformLabel }: { selectedPlatformLabel: string }) => {
  const branchName = await createBranchName({ selectedPlatformLabel })

  useBranchName(branchName)
}

const showPromptForPlatformSelection = () => {
  const quickPick = window.createQuickPick()

  quickPick.items = Object.values(extensionConfig.platforms).map((platform) => ({ label: platform.label }))

  quickPick.onDidChangeSelection(async (selection) => {
    const selectedPlatformLabel = selection[0].label

    promptUserForBranchCreation({ selectedPlatformLabel })
  })

  quickPick.onDidHide(() => quickPick.dispose())

  quickPick.show()
}
