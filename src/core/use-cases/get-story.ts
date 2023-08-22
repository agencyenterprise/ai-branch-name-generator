import { StoryEntity } from '../entities/story'

export type GetStoryUseCaseIn = { storyId: number }
export type GetStoryUseCaseOut = Promise<StoryEntity | undefined>
export type GetStoryAdapters = { getPlatformStoryById: ({ storyId }: { storyId: number }) => Promise<StoryEntity | undefined> }

export const getStory = async ({
  useCaseIn,
  adapters,
}: {
  useCaseIn: GetStoryUseCaseIn
  adapters: GetStoryAdapters
}): GetStoryUseCaseOut => adapters.getPlatformStoryById({ storyId: useCaseIn.storyId })
