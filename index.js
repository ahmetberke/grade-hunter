const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/phaser", express.static(__dirname + "/node_modules/phaser"))
app.use("/game", express.static(__dirname + '/src/game'));
app.use("/assets", express.static(__dirname + '/src/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});