import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("myChecklist.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, done BIT NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertTodo = (title) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todos (title,done) VALUES (?,?)",
        [title, 0],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTodos = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//for the case i want to save the done state later on as well
// export const toggleDone = (id, done) => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "UPDATE todos SET done=? where id=?",
//         [1+done, id],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, err) => {
//           reject(err);
//         }
//       );
//     });
//   });
//   return promise;
// };

export const deleteTodoDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE id=?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
