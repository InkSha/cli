use clap::Subcommand;
use comfy_table::Table;
use rusqlite::{self, params, Connection};
use std::env;
use std::fmt::Debug;
use std::path::PathBuf;

/// item todo
const TODO_STATUS_TODO: &str = "todo";
/// item done
const TODO_STATUS_DONE: &str = "done";
/// item start
const TODO_STATUS_START: &str = "start";
/// item doing
const TODO_STATUS_DOING: &str = "doing";

/// item status list
const TODO_STATUS: [&str; 4] = [
    TODO_STATUS_TODO,
    TODO_STATUS_START,
    TODO_STATUS_DOING,
    TODO_STATUS_DONE,
];

/// todo command
#[derive(Debug, Clone, Subcommand)]
pub enum TodoCommands {
    /// get you todo item
    Get {
        /// get todo key
        key: String,
    },
    /// set you todo item
    Set {
        /// set todo key
        key: String,
        /// set todo content
        val: Option<String>,
        /// set todo status
        #[arg(short, long, default_value = None)]
        status: Option<usize>,
        /// set todo deadline
        #[arg(short, long, default_value = None)]
        deadline: Option<usize>,
    },
    /// filter you todo item
    Filter {
        /// use name filter
        name: Option<String>,
    },
    /// remove you todo item
    Delete { name: String },
    /// add you todo item
    Add { key: String, val: String },
}

/// todo manager entry
pub fn todo_manager(program: TodoCommands) {
    let cwd = env::current_dir().unwrap();
    let db = TodoDB::new(cwd);

    // init table
    db.init_table();

    // match program command
    match program {
        TodoCommands::Get { key } => db.filter(key),
        TodoCommands::Add { key, val } => {
            db.set(&key, val).unwrap();
        }
        TodoCommands::Set {
            key,
            val,
            status,
            deadline,
        } => match val {
            Some(val) => {
                db.update(&key, val).unwrap();
            }
            None => {
                if let Some(status) = status {
                    db.set_status(&key, status).unwrap();
                }
                if let Some(deadline) = deadline {
                    db.set_deadline(&key, deadline).unwrap();
                }

                db.filter(key);
            }
        },
        TodoCommands::Filter { name } => {
            //
            match name {
                Some(name) => db.filter(name),
                None => db.filter("%".to_string()),
            }
        }
        TodoCommands::Delete { name } => {
            db.del(name).unwrap();
        }
    }
}

pub struct TodoDB {
    connection: Connection,
}

impl TodoDB {
    pub fn new(cwd: PathBuf) -> Self {
        let connection = Connection::open(cwd.join("todo/cli.db")).unwrap();
        Self { connection }
    }

    pub fn init_table(&self) {
        self.connection
            .execute(
                "
                  CREATE TABLE IF NOT EXISTS todo_item (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    content TEXT NOT NULL,
                    status INTEGER NOT NULL DEFAULT 0,
                    deadline TEXT DEFAULT (datetime('now', 'localtime', '+7 days')),
                    createAt TEXT DEFAULT (datetime('now', 'localtime')),
                    modifyAt TEXT DEFAULT (datetime('now', 'localtime'))
                  );",
                (),
            )
            .unwrap();
    }

    pub fn set_status(&self, name: &String, status: usize) -> Result<bool, String> {
        let mut lang = self
            .connection
            .prepare("UPDATE todo_item SET status=?1 WHERE name=?2")
            .unwrap();

        let result = lang.execute(params![status, name]).unwrap();
        println!("result {:?}", result);
        Ok(result > 0)
    }

    pub fn set_deadline(&self, name: &String, deadline: usize) -> Result<bool, String> {
        let deadline = format!("'+{} days'", deadline);
        let mut lang = self
            .connection
            .prepare(
                format!(
                "UPDATE todo_item SET deadline=(datetime('now', 'localtime', {})) WHERE name=?1",
                deadline
            )
                .as_str(),
            )
            .unwrap();
        let result = lang.execute(params![name]).unwrap();

        Ok(result > 0)
    }

    pub fn set(&self, name: &String, content: String) -> Result<bool, String> {
        let mut lang = self
            .connection
            .prepare("INSERT INTO todo_item (name, content, status) values(?1, ?2, 0)")
            .unwrap();
        let result = lang.insert(params![name, content]).unwrap();
        Ok(result > 0)
    }

    pub fn update(&self, name: &String, content: String) -> Result<bool, String> {
        let mut lang = self
            .connection
            .prepare("UPDATE todo_item SET content=?1 WHERE name=?2")
            .unwrap();

        let result = lang.execute(params![content, name]).unwrap();

        Ok(result > 0)
    }

    pub fn del(&self, name: String) -> Result<bool, String> {
        let mut lang = self
            .connection
            .prepare("DELETE FROM todo_item WHERE name = ?1")
            .unwrap();

        let result = lang.execute(params![name]).unwrap();

        Ok(result > 0)
    }

    pub fn filter(&self, name: String) {
        let mut lang = self
            .connection
            .prepare("SELECT name, content, status, deadline FROM todo_item WHERE name LIKE ?1")
            .unwrap();
        let mut table = Table::new();
        table.set_header(vec!["Name", "Content", "Status", "Deadline"]);

        let rows = lang
            .query_map(params![name], |row| {
                // ! need use query sql fields order
                let name: String = row.get(0).unwrap();
                let content: String = row.get(1).unwrap();
                let mut status_index: usize = row.get(2).unwrap();
                let deadline = row.get(3).unwrap();

                if status_index > TODO_STATUS.len() {
                    status_index = TODO_STATUS.len() - 1;
                }

                let status = *TODO_STATUS.get(status_index).unwrap();

                Ok(vec![name, content, status.to_string(), deadline])
            })
            .unwrap();

        for row in rows {
            let row = row.unwrap();
            table.add_row(row);
        }

        println!("{}", table);
    }
}
