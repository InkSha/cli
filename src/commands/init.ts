import { Command } from 'commander'
import { BaseCommand } from './base'
import { ActionOptions } from '../types/actions'

export class InitCommand extends BaseCommand {
  public loadProgram(program: Command): void {
    program
      .command('init [name]')
      .alias('i')
      .description('init project')
      .option('-s, --skip-install', 'skip package install', false)
      .action(async (name: string, command: Command) => {
        const options: ActionOptions = []

        this.action.handle(options)
      })
  }
}
