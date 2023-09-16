//Basic config of libraries
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

//User storage
const users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

//create new user {name: ###, password: ###}
app.post("/users", async (req, res) => { //bcrypt uses async await
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send("User created");
    } catch {
        res.status(500).send("Error");
    }
});

//Login sistem
app.post("/users/login", async (req, res) => {

    //Check if user exists, search by its name
    const user = users.find((user) => user.name === req.body.name);     

    if (user === undefined) {
        res.status(404).send("Cannot find user");
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send("Loged in");
            } else {
                res.status(500).send("Not Allowed");
            }
        } catch {
            res.status(500).send("Error");
        }
    }
});

app.listen(3000);
