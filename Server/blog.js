const express = require('express');
const blog = require('./API/blog');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    //console.log('server/blog/get---------');
    // console.log('req.query: ', req.query);
    const response = await blog.getAllRecommendations();
    // console.log('response: ', response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    //console.log('server recommendations------------')
    console.log('req.query: ', req.query);
    const userId = req.query.userId;
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await blog.postRecommendations(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Update ------------------
router.put('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { more } = req.body;
    console.log('req.body: ', req.body);
    const response = await blog.updateRecommendation(postId, more);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching: ', error);
    res.status(400).json({ error: 'Error fetching' });
    return;
  }
});

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('delete server-' , req.params)
    const response = await blog.deleteRecommendation(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching:', error);
    res.status(400).json({ error: 'Error fetching' });
    return;
  }
});

module.exports = router;
