import compressing from 'compressing'
import path from 'path'
import { fileURLToPath } from 'url'
import { packageTemplateList } from '@/config'
import { CommandHandler } from '@/core/command'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const question = new CommandHandler<typeof packageTemplateList[number]>({
  name: 'template',
  type: 'rawlist',
  message: 'select you need template',
  default: 0,
  pageSize: 5,
  choices: packageTemplateList.map(v => (v.name))
})



export default function initProject (projectName: string) {
  question
    .question()
    .then((answers) => compressing.zip
      .uncompress(path.join(__dirname, answers.file), projectName))
    .then(() => {
      console.log('project init success!')
    })
}
