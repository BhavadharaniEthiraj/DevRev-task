const express = require("express");
const bodyParser = require('body-parser');
const book_data = require('./Books.json');
const app = express();
const fs = require('fs');

// Serve static files (index.html)
app.use(express.static('public'));
app.set('view engine', 'ejs');
// const data_path=__dirname+"/data.json";
const signindata = fs.readFileSync('data.json', 'utf8');
const entities = JSON.parse(signindata);

const jsonData1 = fs.readFileSync("books.json","utf-8");
const entitie = JSON.parse(jsonData1);

for (let i = 0; i < entities.length; i++) {
    const mailid = String(entities[i].email);
    const psw = String(entities[i].password);
    console.log(mailid,psw);
}


for (let i = 0; i < entitie.length; i++) {
    const b_name = String(entitie[i].b_name);
    const gen = String(entitie[i].genre,
    );
    console.log(b_name,"-",gen);
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");


});


app.get('/nextpage', (req, res) => {
    res.sendFile(__dirname + '/signin.html');
});

app.post('/submit', (req, res) => {

    const id = req.body.email;
    const psd = req.body.password;
    for (let i = 0; i < entities.length; i++) {
        const mailid = entities[i].email;
        const psw = entities[i].password;
        if (mailid == id && psw == psd) {
            console.log(req.body.email); // Do whatever you want with the form data
            res.redirect("/home");
        }
        
    }
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.get('/book', (req, res) => {
    const name="bhavi";
    res.render('bookpage',{jsonData:book_data});
    console.log(book_data);
    
});


// Handle  signin form submission
app.post('/addEntity', (req, res) => {
    // Read the existing JSON data
    const jsonData = fs.readFileSync('data.json', 'utf8');
    const entities = JSON.parse(jsonData);

    // Extract form data
    const { Name, email, password } = req.body;

    // Create a new entity object
    const newEntity = {
        name: Name,
        email: email,
        password: password
    };

    // Add the new entity to the entities array
    entities.push(newEntity);

    // Write the updated entities array back to the JSON file
    fs.writeFileSync('data.json', JSON.stringify(entities));

    res.send('Entity added successfully!');
});


app.listen(3000, function () {
    console.log("runs");
});
