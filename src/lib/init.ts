import compressing from 'compressing'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { packageTemplateList } from '@/config'
import { CommandHandler } from '@/core/command'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const initParamsName = 'template'

const selectTemplateQuestion = new CommandHandler<Record<typeof initParamsName, string>>({
  name: initParamsName,
  type: 'rawlist',
  message: '选择项目模板',
  default: 0,
  pageSize: 5,
  choices: packageTemplateList.map((v) => v.file)
})

export default function initProject (projectName: string) {
  selectTemplateQuestion
    .question()
    .then((answers) => compressing.zip
      .uncompress(path.join(__dirname, answers[initParamsName]), projectName))
    .then(() => {
      const file = path.join(process.cwd(), projectName, 'package.json')
      const pkg = JSON.parse(fs.readFileSync(file, 'utf-8')) as Record<string, any>
      pkg.name = projectName
      fs.writeFileSync(file, JSON.stringify(pkg), 'utf-8')
    })
    .then(() => {
      console.log(`${path.join(process.cwd(), projectName)} create success!`)
    })
}
