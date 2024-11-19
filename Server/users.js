const express = require('express');
const users_api = require('./API/users');

const router = express.Router();

// ----------- Get ------------------
router.get('/all', async (req, res) => {
  try {
    // console.log("server/users/getall -------: ");
    const user = await users_api.getAllUser();
    const response = user;
    // console.log("server/getall: ", response)
    res.status(200).send(response);
    return;
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

router.get('/', async (req, res) => {
  try {
    console.log("server/users/get -------: ");
    const { username, password } = req.query;
    // console.log('user log:', req.query, " ", username, " ", password);
    const user = await users_api.getUser(username);
    // console.log("userId: ", user[0].id);
    //console.log("userId: ", userId);
    //console.log("checkUser: ", checkUser[0].lat.slice(-4));
    if (user)
    {
      // console.log("first if");
      // console.log("password: ", user[0].password, " , ", password);

      if (user[0].password === password){
        // console.log("second if");
        const response = user;
        // console.log(response);
        res.status(200).send(response);
        return;
      }
    }
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    //console.log('req.query: ', req.query);
    //console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await users_api.postUser(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

// ----------- Update ------------------
router.put('/update/:id', async (req, res) => {
  try {
    console.log('server/ user update');
    console.log('req.body: ', req.body);
    const details = {...req.params, ...req.body};
    console.log(details);
    const response = await users_api.updateUser(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

// // ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    //console.log('delete server-' , req.params)
    const response = await users_api.deleteUser(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Error fetching users' });
    return;
  }
});

module.exports = router;
