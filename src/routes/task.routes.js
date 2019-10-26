const express = require('express');
const router = express.Router();


const users = require('../models/users');
const devices = require('../models/devices');
const events = require('../models/events');

router.get('/users', async (req, res) => {
  const user = await users.findOne({name: 'liveDemo'});
   res.send(user);
 });


 router.post('/devices', async (req, res) => {
  const {deviceId} = req.body;
  const device = await devices.find({user: deviceId});
  res.send(device);
});

router.post('/events', async (req, res) => {
  const {eventsId} = req.body;
  const event = await events.find({i: eventsId, t: {"$gte": 1569381532192, "$lt": 1569382680886}});  
  res.send(event);
}); 


module.exports = router;



/*
router.get('/', async (req, res) => {
 const task = await Task.find();
  console.log(task);
  res.json(task);
});

router.get('/events', async (req, res) => {
  const event = await events.find();

  console.log(event);
  res.send(event);
  });
  

router.get('/:id', async (req, res) => {
const task = await Task.findById(req.params.id);
res.json(task);
});

router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description });
    await task.save();
res.json({status: 'tarea guardada'});
});

router.put('/:id', async (req, res) => {
 const {title, description} = req.body;
 const newTask = {title, description};
 await Task.findByIdAndUpdate(req.params.id, newTask);
 res.json({status: 'tarea actualizada'});
});

router.delete('/:id', async (req, res) => {
await Task.findByIdAndDelete(req.params.id);
res.json({status: 'tarea eliminada'});
});
*/