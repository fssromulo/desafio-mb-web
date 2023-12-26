const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const server = require("http").Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(methodOverride());

app.use("/", routes);
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
