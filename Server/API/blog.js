const { pool } = require('./api');

// ----------- Get ------------------
async function getAllRecommendations() {
    //console.log('api/blog/get/getAllPosts---------');
    const result = await pool.query('SELECT * FROM recommendations');
    return result[0];
}
/*
async function getPostsByUser(id) {
  console.log('api/posts/get/getPostsByUser---------');

  const result = await pool.query('SELECT * FROM posts WHERE userId = ?',
      [parseInt(id)]);
  return result[0];
}*/

// ----------- Post ------------------
async function postRecommendations({ userId, placeId, url, more, rating }) {
  console.log("------------api/recommendations detais-----------")
  // console.log( userId, placeId, url, more  );
  const result = await pool.query("INSERT INTO recommendations (userId, placeId, url, more, rating) VALUES (?, ?, ?, ?, ?)",
      [userId, placeId, url, more, rating]);
  return result[0].insertid;

}

// ----------- Update ------------------
async function updateRecommendation(id, more) {
  console.log('api/update/details: ', id, more);
  const result = await pool.query("UPDATE recommendations SET more = ? WHERE id = ?", 
    [more, parseInt(id)]
  );

  return result[0].affectedRows > 0;
}

// // ----------- Delete ------------------
async function deleteRecommendation({id}) {
      const result = await pool.query("DELETE FROM recommendations WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    getAllRecommendations,
    postRecommendations,
    updateRecommendation,
    deleteRecommendation
    
}
