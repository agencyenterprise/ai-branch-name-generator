import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { GetStoryAdapters, GetStoryUseCaseIn, GetStoryUseCaseOut, getStory } from '../../core/use-cases/get-story'
import { extensionConfig } from '../../extension-config'
import { PivotalAPIStory } from './pivotal-api-story'

const pivotalStoriesApiUrl = `https://www.pivotaltracker.com/services/v5/projects/${extensionConfig.platforms.pivotal.projectId}/stories`

export const getPivotalStory = async ({ storyId }: GetStoryUseCaseIn): GetStoryUseCaseOut =>
  getStory({ useCaseIn: { storyId }, adapters: { getPlatformStoryById: getPivotalStoryById } })

const getPivotalStoryById: GetStoryAdapters['getPlatformStoryById'] = async ({ storyId }) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': extensionConfig.platforms.pivotal.apiToken,
    },
    timeout: 5000,
  }

  try {
    const response: AxiosResponse<PivotalAPIStory> = await axios.get(`${pivotalStoriesApiUrl}/${storyId}`, axiosRequestConfig)

    if (response.status === 200) {
      const pivotalStory = response.data

      return { name: pivotalStory.name, id: pivotalStory.id, type: pivotalStory.story_type }
    }

    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  } catch (error: any) {
    throw new Error(`Error getting Pivotal story ID "${storyId}": ${error.message}`)
  }
}
