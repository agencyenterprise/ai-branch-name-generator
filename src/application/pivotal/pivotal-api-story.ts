export interface PivotalAPIStory {
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
