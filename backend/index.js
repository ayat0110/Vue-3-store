const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

const cors  = require('cors');
app.use(cors());


//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/clothes/:id', (req, res) => {   
    const id = parseInt(req.params.id);
    const clothes = require('./data/clothes.json', {root: __dirname});
    const found = clothes.find(cloth => cloth.id===id);
    res.json(found);
                                           
});

app.get('/clothes', (req, res) => { 

    const clothes = require('./data/clothes.json', {root: __dirname});
    const filtered = clothes.map(cloth => ({
        id : cloth.id,
        title : cloth.title,
        image : cloth.image
    }));
    res.json(filtered);
                                           
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Set the Content-Type header to "application/json"
    res.setHeader('Content-Type', 'application/json');

    // Perform authentication here using the provided username and password
    if (username === 'admin' && password === '123') {
        // If authentication succeeds, return a success response
        res.json({ success: true });
    } else {
        // If authentication fails, return an error response
        res.status(401).json({ error: 'Invalid username or password' });
    }
});



app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

