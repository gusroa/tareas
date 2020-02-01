const express = require('express');
const router = express.Router();

// Modelo de datos 
const Task = require('../models/task'); 

// Manejo de rutas 
router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.render('index',{
        tasks
    });
    console.log()
});


router.post('/add', async (req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
    // res.send('recibido');
    // console.log(new Task(req.body));
    // console.log(req.body);
});

router.get('/done/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskAux = await Task.findById(id);
        taskAux.status = !taskAux.status;
        await taskAux.save();
        res.redirect('/'); 
    } catch (err) {
        console.log(err)
    } 

});

router.get('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskAux = await Task.findById(id);
        res.render('edit', {
            taskAux
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.update({_id: id}, req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

router.get('/delete/:id', async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;

    try {
        await Task.remove({_id : id});
        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
});

module.exports = router; 