const login = require('../models/db');

exports.getHome = (req, res) => {
    res.render('index.ejs', { user: req.session.user }); // Passer les données utilisateur
};

exports.logout = (req, res) => {
    req.session.destroy(); // Détruire la session lors de la déconnexion
    res.redirect('/login');
};

exports.getLogin = (req, res) => {
    res.render('login.ejs');
};

exports.getRegister = (req, res) => {
    res.render('register.ejs');
};

// Route protégée
exports.getProtectedPage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('ProtectedPage.ejs', { user: req.session.user });
};

// Route d'enregistrement
exports.postRegister = async (req, res) => {
    const data = new login({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    try {
        const existingUser = await login.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        } else {
            await data.save();
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Route de connexion
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await login.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: 'Incorrect email' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // Authentification réussie
        req.session.user = { name: user.name, email: user.email }; // Stocker les informations de l'utilisateur dans la session
        res.redirect('/ProtectedPage'); // Rediriger vers la page protégée
    } catch (error) {
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
};