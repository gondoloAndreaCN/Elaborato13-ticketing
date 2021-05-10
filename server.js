const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routerBasics = require("./routes/routerBasic");

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

// parser body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(morgan("dev"));

app.use(express.static(__dirname + '/public'));

app.use("/", routerBasics);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})