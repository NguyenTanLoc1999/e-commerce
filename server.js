// CALL THE PACKAGES ----------
var superSecret = 'toihocmean';
var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var morgan  =   require('morgan');
var mongoose    =   require('mongoose');
var User     = require('./app/models/UserAuth');
var port =process.env.PORT || 8080;
var jwt = require('jsonwebtoken')
var expressSession = require('express-session');
var passport = require('passport');
var expressLayouts=require('express-ejs-layouts');
var path = require ('path');
var flash = require('connect-flash');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo')(expressSession);
// APP CONFIGURATION ----------
// use body parser so we can grab information from POST request
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
//configure our app to handle CORS requests
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// Static folders
app.use(express.static(path.join(__dirname,'public')));

// Load config
dotenv.config({ path: './config/config.env' })

//Config for only development

//Passport  config
require('./config/passport')(passport)

//C1
dbPassword ='mongodb+srv://dbloc:loc01885787608@cluster0.ex7dr.mongodb.net/Ecommerce?retryWrites=true&w=majority'
module.exports = {
    mongoURI: dbPassword
};

mongoose
  .connect(
    dbPassword,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Sessions
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }), 
  }))

// Connect flash
app.use(flash());
//Bodyparser
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// middleware to use for all requests
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
// REGISTER OUR ROUTES----------------

// Register Page

// Routes
app.use('/', require('./routers/index'));
app.use('/users', require('./routers/user'));
app.use('/auth', require('./routers/auth'));

//START THE SERVER
app.listen(port);
console.log('Port need use is: '+port);
