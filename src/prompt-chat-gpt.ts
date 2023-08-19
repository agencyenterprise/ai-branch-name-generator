import OpenAI from 'openai'
import { StoryEntity } from './core/entities/story'
import { extensionConfig } from './extension-config'

const openai = new OpenAI({
  apiKey: extensionConfig.openAI.apiKey,
})

const getContentPrompt = ({ type, id, name }: StoryEntity) =>
  `Given the id number ${id}, the story name: ${name}, the story type: ${type}, 
  and the template for a new feature branch name: "story-type/story-id/story-name", 
  create a branch name not using any special characters from the name, but considering the entire name as the context.
  Return the branch name in lowercase. It needs to be a valid git branch name. Separate all words with a dash.`

export const generateNameUsingChatGPT = async ({
  type: storyType,
  id: storyNumber,
  name: storyName,
}: StoryEntity): Promise<string | null> => {
  const content = getContentPrompt({ type: storyType, id: storyNumber, name: storyName })

  const completion = await openai.chat.completions.create({
    messages: [{ role: extensionConfig.openAI.role, content }],
    model: extensionConfig.openAI.model,
  })

  return completion.choices[0].message.content
}
