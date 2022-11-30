var express = require('express');
var app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())


let tasks = []

app.get("/", (req, res) => {
    res.send("try /v1/tasks")
});

app.post("/v1/tasks", (req, res) => {
    try {
        if (req.body.tasks.length > 1) {
            let bulk = req.body.tasks
            for (let i = 0; i < bulk.length; i++) {
                tasks.push({
                    id: Math.random(100),
                    title: bulk[i].title,
                    isCompleted: false
                })
            }
            return res.status(201).json({ bulk })
        }
    }
    catch (err) {
        console.log("Individual task")
    }
    let task = req.body.title
    let id = Date.now()
    let todo = {
        id: id,
        title: task,
        isCompleted: false
    }
    tasks.push(todo)
    res.status(201).json(id)

})
app.get("/v1/tasks", (req, res) => {

    res.status(200).json({ tasks })

})
app.get("/v1/tasks/:id", (req, res) => {
    let id = req.params.id
    let filtered = tasks.filter((item) => {
        if (item.id == id) {
            return item
        }
    })
    console.log(filtered)
    if (filtered.length != 0) {
        res.status(200).json({ filtered })
    } else {
        res.status(404).json({ error: "There is no task at that id." })
    }

})

app.delete("/v1/tasks/:id", (req, res) => {
    let id = req.params.id
    let filtered = tasks.filter((item) => {
        if (item.id != id) {
            return item
        }
    })
    tasks = filtered
    console.log(tasks)
    res.send(204)

})


app.put("/v1/tasks/:id", (req, res) => {
    let id = req.params.id;
    let title = req.body.title
    let completed = req.body.completed
    console.log(title, completed)
    let found = tasks.some((item) => {
        return item.id == id
    })

    let edit = tasks.filter((item) => {
        if (item.id == id) {
            if (title != undefined) {
                item.title = title
            }
            if (completed != undefined) {
                item.isCompleted = completed
            }
        }
        return item
    })
    if (found) {
        res.send(204)
    } else {
        res.status(404).json({ error: "There is no task at that id." })
    }

})




app.listen(5000);
console.log('Server is listening on port 5000');