const express = require('express');
const authController = require('./controllers/authController');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs'); // Correction de 'view-engine' en 'view engine'
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '1234(',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', authController.getHome);
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
app.get('/logout', authController.logout);
app.get('/ProtectedPage', authController.getProtectedPage);



app.listen(3000, () => {
    console.log('Server is listening to port 3000...');
});