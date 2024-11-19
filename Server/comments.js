const express = require('express');
const comments_api = require('./API/comments');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    //console.log('comm server---------');
    console.log('req.query: ', req.query);
    // console.log('postId: ', req.query.postId);
    const response = await comments_api.getCommentsByPost(req.query.recommendationId);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(400).json({ error: 'Error fetching comments' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    const userId = req.query.userId;
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await comments_api.postComment(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(400).json({ error: 'Error fetching comments' });
    return;
  }
});

// ----------- Update ------------------
router.put('/update/:id', async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const details = {...req.params, ...req.body};
    console.log(details);
    const response = await comments_api.updateComment(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(400).json({ error: 'Error fetching comments' });
    return;
  }
});

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('delete server-' , req.params)
    const response = await comments_api.deleteComment(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(400).json({ error: 'Error fetching comments' });
    return;
  }
});

module.exports = router;
