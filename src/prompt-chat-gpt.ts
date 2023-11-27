import OpenAI from 'openai'
import { StoryEntity } from './core/entities/story'
import { extensionConfig } from './extension-config'

const openai = new OpenAI({
  apiKey: extensionConfig.openAI.apiKey,
})

const getContentPrompt = ({ type, id, name }: StoryEntity) =>
  [
    `Given the id number ${id}, the story name: ${name}, the story type: ${type}.`,
    `Respect the following template when creating the branch name: "${extensionConfig.branchNameTemplate}"`,
    `Create a branch name using only the special characters from the template. Sanitize any other special characters.`,
    `Consider the entire story name as the context.`,
    `The branch name must be in lowercase.`,
    `It needs to be a valid GitHub branch name.`,
    `Separate all words with a dash, respecting the slashes from the template.`,
    `Make the story name part below 60 chars.`,
    `Abbreviate words if needed.`,
    `Just answer with the branch name.`,
    ...(extensionConfig.extraPromptSuggestions ?? []),
  ].join('\n')

export const generateNameUsingChatGPT = async (story: StoryEntity): Promise<string | null> => {
  const content = getContentPrompt(story)

  const completion = await openai.chat.completions.create({
    messages: [{ role: extensionConfig.openAI.role, content }],
    model: extensionConfig.openAI.model,
  })

  return completion.choices[0].message.content
}
