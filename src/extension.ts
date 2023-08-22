import { ExtensionContext, commands } from 'vscode'
import { showUserPrompt } from './show-user-prompt'

const vsCodeExtensionCommand = 'branching-ia.branch-it'

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(vsCodeExtensionCommand, () => {
    showUserPrompt()
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
