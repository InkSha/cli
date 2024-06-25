import path from 'node:path'
import fs from 'node:fs'
import { CommandHandler } from '@/core/command'
import { log } from '../utils'
import { execSync } from 'node:child_process'
import SelectPackageManager from './pkgmanager'

const devDependencies = [
  '@jest/globals',
  '@types/jest',
  'jest',
  'jest-config',
  'ts-jest',
  'ts-node'
]

const pkgScript = {
  "test": "jest",
  "test:watch": "jest --watch",
}

const exampleFile = 'example.test.ts'

const exampleContent = `
describe('Example Test', () => {
  beforeAll(() => {
    console.log('on test before exec')
  })

  afterAll(() => {
    console.log('on test after exec')
  })

  it('example test one', () => {
    console.log('example test one')
    expect('example').toBe('example')
  })
})`

const configFile = 'jest.config.ts'
const configContent = `
import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
}

export default config
`

const testParamsName = 'test'

const testQuestion = new CommandHandler({
  name: testParamsName,
  type: 'input',
  message: '输入测试文件夹名称',
  default: 'test'
})

export default function testCommand (project: string) {
  testQuestion
    .question()
    .then(answers => answers[testParamsName])
    .then(dir => {
      // make test dir and example file
      const projectDir = path.join(process.cwd(), project)
      const testDir = path.join(projectDir, dir)

      if (fs.existsSync(testDir)) {
        fs.rmdirSync(testDir)
      }

      fs.mkdirSync(testDir)
      fs.writeFileSync(path.join(testDir, exampleFile), exampleContent, 'utf8')
    })
    .then(() => {
      // make config
      const cf = path.join(process.cwd(), project, configFile)

      if (fs.existsSync(cf)) {
        log.warn(`已存在 ${configFile} 文件!`)
      } else {
        fs.writeFileSync(cf, configContent, 'utf8')
      }
    })
    .then(async () => {
      // add devDependencies and script
      process.chdir(project)

      return SelectPackageManager()
    })
    .then(manager => {

      log.info(`当前目录 ${process.cwd()}`)
      log.primary(`正在使用 ${manager} 安装依赖包...`)

      execSync(`${manager} install -D ${devDependencies.join(' ')}`)
    })
    .then(() => {
      log.success('安装依赖成功!')
      log.info('更改配置')
      const pkgPath = path.join(process.cwd(), 'package.json')
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      console.log(pkg)

      pkg.script = {
        ...pkg.script,
        ...pkgScript
      }

      fs.writeFileSync(pkgPath, JSON.stringify(pkg), 'utf8')

      console.log(pkg)
    })
}
