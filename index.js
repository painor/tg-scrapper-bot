const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const Web3 = require('web3');

dotenv.config();

const mainRoutes = require('./app/routes/main');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store, // store sessions in MongoDB with connect-mongodb-session
    cookie : {
        sameSite: 'strict', // THIS is the config you are looing for.
    }
}));
app.use(csrf({cookie: false}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use('/', express.static(process.cwd() + '/public/assets'));
app.use(flash());


app.use(mainRoutes);

mongoose
    .connect(MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    })
    .then(result => {
        app.listen(PORT, process.env.IP, () => {
            console.log(`App listening on port ${PORT}.`);
        });
    })
    .catch(err => console.log(err));
