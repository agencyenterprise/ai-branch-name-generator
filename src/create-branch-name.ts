import { window } from 'vscode'
import { getPivotalStory } from './application/pivotal/get-story'
import { extensionConfig } from './extension-config'
import { generateNameUsingChatGPT } from './prompt-chat-gpt'

export const createBranchName = async ({ selectedPlatformLabel }: { selectedPlatformLabel: string }): Promise<string> => {
  const inputStoryId = await window.showInputBox({
    placeHolder: `${selectedPlatformLabel} story ID`,
    validateInput: (text) => {
      return text !== '' && isNaN(+text) ? `This is not a valid story id!` : null
    },
  })

  if (!inputStoryId) {
    throw new Error(`Story ID not provided!`)
  }

  const story = await getStory({ selectedPlatformLabel, inputStoryId })

  if (!story) {
    throw new Error(`Story not found!`)
  }

  try {
    const branchName = await generateNameUsingChatGPT(story)

    if (!branchName) {
      throw new Error(`Branch name not generated!`)
    }

    return branchName
  } catch (error: any) {
    console.log(`Error generating branch name using ChatGPT`, error)
    throw new Error(error.message)
  }
}

const getStory = async ({ selectedPlatformLabel, inputStoryId }: { selectedPlatformLabel: string; inputStoryId: string }) => {
  try {
    switch (selectedPlatformLabel) {
      case extensionConfig.platforms.pivotal.label:
        return getPivotalStory({ storyId: +inputStoryId })
      default:
        throw new Error(`Platform "${selectedPlatformLabel}" not supported!`)
    }
  } catch (error: any) {
    console.log(`Error getting "${selectedPlatformLabel}" story ID "${inputStoryId}"`, error)

    throw new Error(error.message)
  }
}
