const express = require('express');
const router = express.Router();

const Task = require('../models/task');

const events = require('../models/events');

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

module.exports = router;