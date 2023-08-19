import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as vscode from 'vscode'

// Set your Pivotal Tracker API token and project ID
const apiToken = vscode.workspace.getConfiguration().get('branching-ia.apiToken') as string
const projectId = vscode.workspace.getConfiguration().get('branching-ia.projectId') as string

// Define the API endpoint URL
const baseStoriesApiUrl = `https://www.pivotaltracker.com/services/v5/projects/${projectId}/stories`

export interface Story {
  kind: string
  id: number
  created_at: string
  updated_at: string
  estimate: number
  story_type: string
  story_priority: string
  name: string
  current_state: string
  requested_by_id: number
  url: string
  project_id: number
  owner_ids: number[]
  labels: Label[]
  owned_by_id: number
}

export interface Label {
  id: number
  project_id: number
  kind: string
  name: string
  created_at: string
  updated_at: string
}

// Create a function to fetch story descriptions
export async function fetchStory({ storyId }: { storyId: number }): Promise<Story | undefined> {
  try {
    // Set the request configuration
    const config: AxiosRequestConfig = {
      headers: {
        'X-TrackerToken': apiToken,
      },
      timeout: 5000, // Set a timeout value in milliseconds
    }

    console.log(`url`, `${baseStoriesApiUrl}/${storyId}`)

    // Make a GET request to fetch project details
    const response: AxiosResponse = await axios.get(`${baseStoriesApiUrl}/${storyId}`, config)

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      return response.data
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`)
    }
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
