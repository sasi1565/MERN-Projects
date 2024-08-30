// var http = require('http');

// const server = http.createServer((req,res)=>{
//     var body = "hello World"
//     res.writeHead(200,
//         {'Content-Type': 'text/plain',},
//     );
// })

// server.listen(8001,()=>{
//     console.log(`Server Listening at http://localhost:8001`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ToDoListDataBase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
    id: Number,
    task: String,
});



const Task = mongoose.model('toDoCollection', taskSchema); 

app.get('/',(req,res) => {
    console.log("At /")
})

// app.post('/addTask', (req, res) => {
//     const newItem = new Task({
//       id:Date.now(),
//       task: req.body.task,
//     });
//   console.log(req.body.task);
//     newItem.save()
//     .then((savedTask) => {
//         return res.status(200).send(savedTask);
//       }).then((err)=> res.status(500).send(err));
//   });

app.post('/addTask', (req, res) => {
    const newItem = new Task({
        id: Date.now(),
        task: req.body.task,
    });

    console.log(req.body.task);

    newItem.save()
        .then((savedTask) => {
            return res.status(200).json(savedTask);
        })
        .catch((err) => {
            console.error('Error saving task:', err);
            return res.status(500).json({ error: 'Failed to save task' });
        });
});


app.get('/getTasks',(req,res)=> {
    console.log('Received a request for tasks'); 
    Task.find({}).then(items => {
        return res.send(items);
    })
    .catch(err => {  
        console.error(err);  
        res.status(500).send('Error fetching tasks'); // Send an error response  
    });
})

app.put('/updateTask/:id',(req,res) => {
    console.log(req.body)
    Task.updateOne({id:req.params.id},req.body)
    .then(()=>{
        console.log("Updated Successfully");
        res.status(200).send({ message: 'Task updated successfully' })
    })
    .catch(err => {  
        console.error(err);  
        res.status(500).send('Error fetching tasks');
    });
})

app.delete('/delete/:id',(req,res)=> {
    Task.deleteOne({id:req.params.id})
    .then(()=>{
        console.log('Completed The Task');
        res.status(200).send({ message: 'Completed successfully' })
    })
    .catch((err)=> {
        console.error(err);  
        res.status(500).send('Error fetching tasks');
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});