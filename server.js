const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const items = require('./routes/api/Items');

const app = express();

app.use(bodyParser.json());
app.use(cors())
// DB config

// connect to mongo URI
mongoose.connect('mongodb://george1:george1@ds245548.mlab.com:45548/medium', {
    useNewUrlParser: true
})
.then(() => console.log('mongdb connected.....'))
.catch(err => console.log(err))

// use routes
app.use('/api/Items', items); 

// Serve our static asset if in production 
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));