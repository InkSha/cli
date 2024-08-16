export enum FileType {
  File = 'file',
  Dir = 'dir',
}

export type File = {
  type: FileType.File
  name: string
  content: string
  /**
   * content property is file path
   * @default false
   */
  raw?: boolean
  command?: TemplateCommand[]
}

export type Dir = {
  type: FileType.Dir
  name: string
  files: (File | Dir)[]
  command?: TemplateCommand[]
}

export type TemplateCommand = {
  /**
   * create current content exec command
   * @example
   *
   * ```shell
   * echo create src dir success!
   * ```
   */
  lang: string
  /**
   * create before exec
   * @default false
   */
  before?: boolean
  /**
   * create after exec
   * @default true
   */
  after?: boolean
  /**
   * whether error occurs, always exec
   * @default false
   */
  always?: boolean
}

export type SchemaTemplate = {
  name: string
  tags: string[]
  description: string
  files: Array<File | Dir>
}
