import fs from 'node:fs'
import path from 'node:path'
import { Dir, File, FileType, SchemaTemplate, TemplateCommand } from '../types/schema'
import { log } from '../utils/log'

/**
 * @class CreateSchema
 * @description with give template create project
 */
export class CreateSchema {
  constructor(
    /**
     * create project template
     */
    private readonly template: SchemaTemplate,
  ) {}

  /**
   * create project
   * @param projectName create project name
   */
  public create(projectName: string) {
    this.createDir(
      {
        type: FileType.Dir,
        name: projectName,
        files: this.template.files,
      },
      process.cwd(),
    )
  }

  private execCommand(command: TemplateCommand) {
    log(command)
  }

  /**
   * create dir
   * @param dir create dir name
   * @param base fir parent dir
   */
  private createDir(dir: Dir, base: string): void {
    const dirPath = path.join(base, dir.name)

    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath)
    }

    fs.mkdirSync(dirPath)

    for (const filePath of dir.files) {
      const type = filePath.type
      switch (type) {
        case FileType.Dir:
          this.createDir(filePath, dirPath)
          break
        case FileType.File:
          this.createFile(filePath, dirPath)
          break
        default:
          // eslint-disable-next-line no-case-declarations
          const end: never = type
      }
    }
  }

  /**
   * create file
   * @param file create file name
   * @param base file parent dir
   */
  private createFile(file: File, base: string) {
    const filePath = path.join(base, file.name)

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath)
    }

    fs.writeFileSync(filePath, file.content, 'utf-8')
  }
}
