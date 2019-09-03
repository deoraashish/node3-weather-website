const path = require('path');

const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocoding');
const forecast = require('./utils/forecast.js');

const app = express();

// Setup of Express Paths Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// Setup of Express view engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup for public directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashish Deora'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ashish Deora'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Ashish Deora',
        title: 'Help',
        message: 'Dummy Help Message'
    });
});

app.get('/weather',(req,res)=>{
    const queryParams = req.query;
    if (!queryParams.address) {
        return res.send({
            error: 'Please provide a valid address'
        });       
    }
    geocode(queryParams.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }
            return res.send({
                forecast: forecastData,
                address: queryParams.address,
                location
            });
        });
    });
});

app.get('/help/*',(req, res) => {
    res.render('404',{
        errorMessage: 'Help Article not found',
        title: '404',
        name: 'Ashish Deora'
    });
});

app.get('**', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Ashish Deora'
    });
});

app.listen(3000, () => {
    console.log('Server Started');
});

