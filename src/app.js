const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port=process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alakbar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Alakbar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hello from help page',
        name: 'Alakbar'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'You must provide address'
        });

    forecast(req.query.address, (error, data) => {
        if (error)
            return res.send({
                error
            });

        res.send({
            forecast: data,
            address: req.query.address
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help Article not found',
        title: 'Error page',
        name: 'Alakbar'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 Error, oops',
        title: 'Error page',
        name: 'Alakbar'
    });
});

app.listen(port, () => {
    console.log('Server is up');
});