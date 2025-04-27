const express = require('express');
const { rootRouter } = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);

const port = 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})