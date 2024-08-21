use clap::Subcommand;

#[derive(Debug, Clone, Subcommand)]
pub enum InitCommands {
    Select,
    Custom,
}

pub fn init_project(program: InitCommands) {
    println!("init {:?}", program);
}
