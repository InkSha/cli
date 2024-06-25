import chalk from 'chalk'

export default {
  error: (text: string) => console.log(chalk.bold.red(text)),
  warn: (text: string) => console.log(chalk.italic.yellow(text)),
  success: (text: string) => console.log(chalk.green(text)),
  primary: (text: string) => console.log(chalk.blueBright(text)),
  info: (text: string) => console.log(chalk.gray(text)),
}
