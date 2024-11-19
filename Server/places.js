const express = require('express');
const places = require('./API/places');

const router = express.Router();

// ----------- Get ------------------
router.get('/', async (req, res) => {
  try {
    //console.log('server/places/get---------');
    // console.log('req.query: ', req.query);
    const response = await places.getAllPlaces();
    // console.log('response: ', response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Error fetching places' });
    return;
  }
});

// ----------- Post ------------------
router.post('/post', async (req, res) => {
  try {
    //console.log('server/place/post-' , req.params)
    console.log('req.query: ', req.query);
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await places.postPlace(details);
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
    //console.log('server/place/update --------')
    const placeId = req.params.id;
    const { title, body } = req.body;
    console.log('req.body: ', req.body);
    const details = { ...req.params, ...req.body };
    const response = await places.updatePlace(details);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'Error fetching posts' });
    return;
  }
});

// ----------- Delete ------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    //console.log('server/place/delete-' , req.params)
    const response = await places.deletePlace(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Error fetching places' });
    return;
  }
});

module.exports = router;
