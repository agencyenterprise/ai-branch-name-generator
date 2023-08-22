import OpenAI from 'openai'
import { StoryEntity } from './core/entities/story'
import { extensionConfig } from './extension-config'

const openai = new OpenAI({
  apiKey: extensionConfig.openAI.apiKey,
})

const getContentPrompt = ({ type, id, name }: StoryEntity) =>
  `Given the id number ${id}, the story name: ${name}, the story type: ${type}, 
  and the template for a new feature branch name: "type/id/name-following-rules", e.g.: "feature/123/branch-name", 
  create a branch name not using any special characters from the name. Consider the entire name as the context.
  Return the branch name in lowercase. It needs to be a valid git branch name.
  Separate all words with a dash, respecting the slashes from the template. Just answer with the branch name.`

export const generateNameUsingChatGPT = async (story: StoryEntity): Promise<string | null> => {
  const content = getContentPrompt(story)

  const completion = await openai.chat.completions.create({
    messages: [{ role: extensionConfig.openAI.role, content }],
    model: extensionConfig.openAI.model,
  })

  return completion.choices[0].message.content
}
