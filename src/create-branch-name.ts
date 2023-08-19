import * as vscode from 'vscode'

const illegalCharacters = [...'@!?#&|\\/^_$%*:']

export const createBranch = async ({ platform }: { platform: string }) => {
  var storyType = 'feature'

  const ticketId = await vscode.window.showInputBox({
    placeHolder: `${platform} story ID`,
    validateInput: (text) => {
      return text !== '' && validateInput(text) ? null : `It's not a valid branch name!`
    },
  })

  return `${storyType}/${ticketId}`.toLowerCase()
}

const validateInput = (value: string): boolean => {
  if (value === '' && value === null && value === undefined) {
    return true
  }

  var validInput = true

  illegalCharacters.forEach((element) => {
    if (value.includes(element)) {
      validInput = false
      return true
    }
  })

  return validInput
}
