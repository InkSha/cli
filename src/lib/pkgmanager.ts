import { CommandHandler } from '@/core/command'

const pkgManagerParams = 'pkg'
const pkgManagerList = [
  'npm',
  'cnpm',
  'pnpm',
  'yarn'
] as const

export default async function SelectPackageManager () {
  return new CommandHandler({
    name: pkgManagerParams,
    type: 'list',
    message: '选择使用的包管理器',
    default: 0,
    pageSize: 5,
    choices: pkgManagerList
  }).question()
    .then(answer => answer[pkgManagerParams] as typeof pkgManagerList[number])
}
