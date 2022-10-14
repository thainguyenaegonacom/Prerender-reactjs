const express = require("express");
const app = express();
const port = 3001;

const path = require('path')


app.use(
    require("prerender-node").set(
        "prerenderServiceUrl",
        "http://localhost:3000"
    )
);

app.use('/', express.static(path.join(__dirname, 'reactjs/build')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "reactjs/build", "index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
