import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { StoryEntity } from '../../core/entities/story'
import { GetStoryAdapters, GetStoryUseCaseIn, getStory } from '../../core/use-cases/get-story'
import { extensionConfig } from '../../extension-config'
import { PivotalAPIStory } from './pivotal-api-story'

const pivotalStoriesApiUrl = `https://www.pivotaltracker.com/services/v5/projects/${extensionConfig.platforms.pivotal.projectId}/stories`

export const getPivotalStory = async ({ storyId }: GetStoryUseCaseIn): Promise<StoryEntity> =>
  getStory({ useCaseIn: { storyId }, adapters: { getPlatformStoryById: getPivotalStoryById } })

const getPivotalStoryById: GetStoryAdapters['getPlatformStoryById'] = async ({ storyId }) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': extensionConfig.platforms.pivotal.apiToken,
    },
    timeout: 5000,
  }

  console.log(`aaaaaaa`, `${pivotalStoriesApiUrl}/${storyId}`)

  const response: AxiosResponse<PivotalAPIStory> = await axios.get(`${pivotalStoriesApiUrl}/${storyId}`, axiosRequestConfig)

  if (response.status === 200) {
    const pivotalStory = response.data

    return { name: pivotalStory.name, id: pivotalStory.id, type: pivotalStory.story_type }
  }

  throw new Error(`Error: ${response.status} - ${response.statusText}`)
}
