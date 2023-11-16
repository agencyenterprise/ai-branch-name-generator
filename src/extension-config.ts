import { CompletionCreateParams, CreateChatCompletionRequestMessage } from 'openai/resources/chat/completions'
import * as vscode from 'vscode'

type Platform = { label: string }

type PivotalPlatform = { apiToken: string; projectId: string } & Platform
type OpenAI = { apiKey: string; role: CreateChatCompletionRequestMessage['role']; model: CompletionCreateParams['model'] }

type Config = {
  defaultPlatform: string
  platforms: { pivotal: PivotalPlatform }
  openAI: OpenAI
}

export const extensionConfig: Config = {
  defaultPlatform: vscode.workspace.getConfiguration().get('ai-branch-name-generator.defaultPlatform') as string,
  platforms: {
    pivotal: {
      label: 'Pivotal',
      apiToken: vscode.workspace.getConfiguration().get('ai-branch-name-generator.pivotalAPIToken') as string,
      projectId: vscode.workspace.getConfiguration().get('ai-branch-name-generator.pivotalProjectId') as string,
    },
  },
  openAI: {
    apiKey: vscode.workspace.getConfiguration().get('ai-branch-name-generator.openAiKey') as string,
    role: 'user',
    model: 'gpt-3.5-turbo',
  },
}
