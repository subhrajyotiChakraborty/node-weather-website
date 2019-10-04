const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Subha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Subha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Subha',
        msg: 'This is a text message in help page'
    });
});

app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude = 0, longitude = 0, placeName} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (forecastError, forecastResponse) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                });
            }
            res.send({
                forecast: forecastResponse,
                location: placeName,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Subha',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Subha',
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});