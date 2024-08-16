#!/usr/bin/env ts-node

import './config/env'
import { LoadCommand } from './commands/loader'
import { Command } from 'commander'
import { CreateSchema } from './schema/create'
import { baseTemplate } from './schema/template'
import pkg from '../package.json'

const bootstrap = async () => {
  const program = new Command()
    .version(pkg.version, '-v, --version', 'Output the current version.')
    .usage('<command> [options')
    .helpOption('-h, --help', 'Output usage information.')

  LoadCommand.loadCommand(program)
}

// bootstrap()

new CreateSchema(baseTemplate).create('tmp')
