import { Command } from 'commander'
import { InitCommand } from './init'
import { InitAction } from '../actions/init'

export class LoadCommand {
  public static loadCommand(program: Command) {
    new InitCommand(new InitAction()).loadProgram(program)
  }
}
