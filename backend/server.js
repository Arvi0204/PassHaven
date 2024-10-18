const express = require('express');
const cors = require('cors')

const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/PassHaven?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

mongoose.connect(mongoURI);
const app = express();
const port = 2000

app.use(cors());
app.use(express.json())


// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/passwords', require('./routes/passwords'))

app.get('/', (req, res) => {
  res.send('Hello Arvind!')
})

app.listen(port, () => {
  console.log(`passhaven backend listening on port ${port}`)
})