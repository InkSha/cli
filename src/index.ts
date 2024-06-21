#!/usr/bin/env node

import { Command } from 'commander'

import packageFile from './../package.json'  assert { type: 'json' }
import { initProject } from '@/lib'

const program = new Command()
  .name(packageFile.name)
  .description(packageFile.description)
  .version(packageFile.version)



program
  .command('init <project>')
  .action(project => {
    console.log(`you input project name is ${project}`)
    initProject(project)
  })

program
  .command('update <project>')
  .action(project => {
    console.log(`you need update project is ${project}`)
  })

program.parse()
