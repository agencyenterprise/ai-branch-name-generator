import * as vscode from 'vscode'
import { showUserPrompt } from './show-user-prompt'

const vsCodeExtensionCommand = 'branching-ia.branch-it'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(vsCodeExtensionCommand, () => {
    showUserPrompt()
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
