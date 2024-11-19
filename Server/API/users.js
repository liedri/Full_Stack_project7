const { pool } = require('./api');

// ----------- Get ------------------
async function getAllUser() {
  // console.log("api/getAllUser_function -----------: ");
  const result = await pool.query('SELECT * FROM users');
  // console.log('api/users/get/result: ', result[0]);
  return result[0];
}

async function getUser(username) {
  // console.log("api/getUser_function -----------: ");
  // console.log("username: ", username);
  const result = await pool.query('SELECT * FROM users WHERE username = ?',
  [username]);
  //console.log('api/users/get/result: ', result[0][0].id);
  return result[0];
}
/*
async function getUserPassword(id) {
  //console.log("getUserPassword function -----------: ");
  //console.log("id: ", id);
  const result = await pool.query('SELECT * FROM address WHERE id = ?',
  [id]);
  //console.log('api/users/get/result2: ', result);
  return result[0];
}*/

// ----------- Post ------------------
async function postUser({name, phone, email, street, city, username, password}) {
  console.log("------------api/users detais-----------")
  // console.log(name, phone, email, street, city, username, password);
  const result = await pool.query("INSERT INTO users (name, phone, email, street, city, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phone, email, street, city, username, password]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updateUser({id, name, phone, email, street, city}) {
  console.log("------------api/users update-----------")

  const result = await pool.query("UPDATE users SET name = ?,  phone = ?, email = ?, street = ?, city = ? WHERE id = ?", 
  [name, phone, email, street, city, parseInt(id)]);

return result[0].affectedRows > 0
}

// ----------- Delete ------------------
async function deleteUser({id}) {
      const result = await pool.query("DELETE FROM users WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
  getAllUser,
  getUser,
  postUser,
  updateUser,
  deleteUser
}
