# AI Branch Name Generator

This extension creates branch names based on the story name using Chat GPT.

## Features

Use the command `Generate Branch Name` to start generating. It's possible to either copy the generated branch name or create/checkout the branch during the process.

## Requirements

- Need a paid Chat GPT account to use a key.
- Need to configure a Pivotal project id.

## Extension Settings

This extension contributes the following settings:

- `ai-branch-name-generator.openAiKey`: API Key for OpenAI. Make sure you have a paid account before creating a key.
- `ai-branch-name-generator.defaultPlatform`: Default platform to be used when creating a branch.
- `ai-branch-name-generator.branchNameTemplate`: Sets how the branch name will be generated. The default is: 'the-story-type/the-story-id/use-the-story-name-following-the-prompt-rules'.
- `ai-branch-name-generator.extraPromptSuggestions`: An array of extra items to be added when prompting chatgpt.
- `ai-branch-name-generator.pivotalAPIToken`: API Token for Pivotal.
- `ai-branch-name-generator.pivotalProjectId`: Project Id for Pivotal.

## Contributing

You can add new configurations to the `extension-config` file.

## Testing locally

- Press F5
- Configure the extension settings
- Run the extension command to `Generate Branch Name`

## Release Notes

### 1.0.0

Initial release of the branching AI extension.

## Thanks to

- [Made with ❤️ by AE Studio ](https://ae.studio)
- [Icon made by Freepik](https://www.freepik.com)
