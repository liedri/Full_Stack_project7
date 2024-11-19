const { pool } = require('./api');

// ----------- Get ------------------
async function getCommentsByPost(id) {
    console.log("id:", id);
  const result = await pool.query('SELECT * FROM comments WHERE recommendationId = ?',
      [parseInt(id)]);
  console.log('comm api result[0]: ', result[0]);

  return result[0];
}

// ----------- Post ------------------
async function postComment({ recommendationId, userId, body }) {
  console.log("------------api detais-----------")
  console.log( parseInt(recommendationId), userId, body);
  const result = await pool.query("INSERT INTO comments (recommendationId, userId, body) VALUES (?, ?, ?)",
      [parseInt(recommendationId), userId, body]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updateComment({id, body}) {
  console.log("api/update id: ", id, " body: ", body);
  const result = await pool.query("UPDATE comments SET body = ? WHERE id = ?", 
  [body, parseInt(id)]);

return result[0].affectedRows > 0
}

// ----------- Delete ------------------
async function deleteComment({id}) {
      const result = await pool.query("DELETE FROM comments WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
  getCommentsByPost,
  postComment,
  updateComment,
  deleteComment
}
