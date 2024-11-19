const { pool } = require('./api');

// ----------- Get ------------------
async function getAllPlaces() {
    //console.log('api/places/get/getAllPlaces---------');
    const result = await pool.query('SELECT * FROM places');
    return result[0];
}

// ----------- Post ------------------
// async function postPlace({ name, area, placeCategory, url, more}) {
//   console.log("API/place/post ------------")
//   console.log( name, area, placeCategory, url, more );
//   const result = await pool.query("INSERT INTO places (name, area, placeCategory, url, more) VALUES (?, ?, ?, ?, ?)",
//       [name, area, placeCategory, url || NULL, more || NULL]);
//   return result[0].insertid;

// }
async function postPlace({ name, area, placeCategory, url}) {
  console.log("API/place/post ------------")
  console.log( name, area, placeCategory, url);
  const result = await pool.query("INSERT INTO places (name, area, placeCategory, url) VALUES (?, ?, ?, ?)",
      [name, area, placeCategory, url]);
  return result[0].insertid;

}
// ----------- Update ------------------
async function updatePlace(id, name, area, placeCategory, url, more) {
  console.log('api/update/details: ', id, title, body);
  const result = await pool.query("UPDATE posts SET name = ?, area = ? placeCategory = ?, url = ? more = ? WHERE id = ?", 
    [name, area, placeCategory, url, more, parseInt(id)]
  );

  return result[0].affectedRows > 0;
}

// ----------- Delete ------------------
async function deletePlace({id}) {
      const result = await pool.query("DELETE FROM places WHERE id = ?",
        [parseInt(id)]
    );

    return result[0].affectedRows > 0
}

module.exports = {
    getAllPlaces,
    postPlace,
    updatePlace,
    deletePlace
}
