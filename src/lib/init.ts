import compressing from 'compressing'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { packageTemplateList } from '@/config'
import { CommandHandler } from '@/core/command'
import { log } from '@/utils'

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
      log.success(`项目 ${projectName} 创建成功!`)
      log.info('-'.padEnd(120, '-'))
      log.primary('你可以:')
      log.primary(`使用命令 cd ${projectName} 切换到项目文件夹下`)
      log.primary(`执行 npm install 安装项目依赖`)
      log.primary('执行 npm run dev 在开发环境运行项目')
      log.info('-'.padEnd(120, '-'))
    })
}
