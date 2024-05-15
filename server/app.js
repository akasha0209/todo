const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieSession = require("cookie-session");

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, // Set this to 'true'
    optionsSuccessStatus: 204,
  }));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(
    cookieSession({
        name:"Akash-session",
        secret:"MY_COOKIE",
        httpOnly:true
    })
);

// parse requests of content type - application/json
app.use(bodyParser.json());

// Parse request of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connected to the Database");
        initial();
    })
    .catch(err => {
        console.log("Cannot connect to the database", err);
        process.exit();
    });

function initial(){
    Role.estimatedDocumentCount((err, count)=>{
        if(!err && count === 0){
            new Role({
                name:"user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to role collection");
            });

            new Role({
                name:"moderator"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name:"admin"
            }).save(err=>{
                if(err){
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome To Todo API for Angular" });
})

require("./routes/tutorial.routes.js")(app)
require("./routes/auth.routes.js")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
})