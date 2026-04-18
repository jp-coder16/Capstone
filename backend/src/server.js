const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post("/post", (req, res)=>{
    res.get("Hello World");
})

