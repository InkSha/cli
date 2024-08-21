use clap::Parser;
use core::{Commands, Program};
use init::init_project;
use todo::todo_manager;

/**
 * Program Core
 *
 * Defined program command
 *
 * Has command:
 *
 * - create
 *    - create project
 * - todo
 *    - todo item manager
 */
mod core;

/**
 * Init Project
 */
mod init;

/**
 * Manager Todo Items
 *
 * Use SQLite database development
 *
 * Has methods:
 *
 * - add
 *    - add todo item
 * - filter
 *    - with todo name filter list
 *    - default view all
 * - get
 *    - get start with name todo items
 * - set
 *    - set todo status
 *    - set todo deadline
 *    - set todo content
 * - remove
 *    - remove todo item
 */
mod todo;

fn main() {
    let args = Program::parse();

    // match user command branch
    match args.command {
        Commands::Create { sh } => init_project(sh),
        Commands::Todo { sh } => todo_manager(sh),
    }
}
