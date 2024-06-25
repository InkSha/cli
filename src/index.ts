#!/usr/bin/env node

import { Command } from 'commander'

import packageFile from './../package.json'  assert { type: 'json' }
import { initProject, testCommand } from '@/lib'

const program = new Command()
  .name(packageFile.name)
  .description(packageFile.description)
  .version(packageFile.version)

program
  .command('init <project>')
  .action(project => {
    initProject(project)
  })

program
  .command('test <project>')
  .action(project => {
    testCommand(project)
  })

program.parse()
