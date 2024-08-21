use std::path::PathBuf;

use crate::{init::InitCommands, todo::TodoCommands};
use clap::{Parser, Subcommand};

#[derive(Parser, Debug)]
#[command(version, about, long_about=None)]
pub struct Program {
    /// custom config file path
    #[arg(short, long, value_name = "FILE")]
    pub config: Option<PathBuf>,

    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Clone, Subcommand)]
pub enum Commands {
    /// Create Project Template
    Create {
        #[command(subcommand)]
        sh: InitCommands,
    },
    /// Manager Todo
    Todo {
        #[command(subcommand)]
        sh: TodoCommands,
    },
}
