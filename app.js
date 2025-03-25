const express = require('express');
const login = require('./db');
const app = express();

app.set('view-engine', 'ejs');
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/logout', (req,res) => {
    res.redirect('/login')
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.get('/register', (req,res) => {
    res.render('register.ejs')
})



app.post('/register', async (req,res) => {
    const data = new login({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })

    try {
        const existingUser = await login.findOne({email:req.body.email})

        if (existingUser){
            return res.status(400).json({error: 'Email already registered'})
        } else {

            await data.save()
            res.redirect('/login')
        }

    } catch(error) {
        res.status(500).json({error: 'Server error'})
    }
})


app.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await login.findOne({email: email})

        if(!user){
            return res.status(400).json({error: 'incorrect email or password'})
        }

        if (user.password !== password) {
            return res.status(400).json({error: 'incorrect password'})
        }

        res.redirect('/')
    } catch (error) {
        res.status(500).json({error: 'An error occured. Please try again.'})
    }
})





app.listen(3000, () => {
    console.log('Server is listening to port 3000...')
})
