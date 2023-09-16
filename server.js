const express = require("express");
const app = express();

app.use(express.json());

const users = [{ name: "pablo", password: "admin" }];

app.get("/", (req, res) => {
    res.json(users);
});

app.post("/", (req, res) => {
    const user = { name: req.body.nombre, password: req.body.password };
    users.push(user);
    res.status(201).send("User created");
});

app.listen(3000);
