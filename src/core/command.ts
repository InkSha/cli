// import { Command } from 'commander'
import inquirer, { type Answers, type QuestionCollection } from 'inquirer'

export class CommandHandler<A extends Answers> {
  constructor (
    private inquirer: QuestionCollection<A>
  ) {}

  async question () {
    return inquirer.prompt(this.inquirer)
  }
}
