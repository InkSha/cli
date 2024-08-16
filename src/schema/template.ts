import { SchemaTemplate, FileType } from '../types/schema'

export const baseTemplate: SchemaTemplate = {
  name: 'base',
  description: 'base template',
  tags: ['ts'],
  files: [
    {
      type: FileType.Dir,
      name: 'src',
      command: [
        {
          lang: 'echo create src dir',
        },
      ],
      files: [
        {
          type: FileType.File,
          name: 'main.ts',
          content: 'console.log("Hello World!")',
          command: [
            {
              lang: 'echo create main.ts file success!',
            },
          ],
        },
      ],
    },
  ],
}
