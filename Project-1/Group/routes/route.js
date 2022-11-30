const express = require('express')
const app = express.app()

const server= require('../group/server')

app.get('/', (req, res) => {}
)

app.get('/', incident.homeRoutes);

app.get('/add-incident', views.add-incident)

app.get('/update-incident', views.update-incident)

app.post('/incident', controller.create);
app.get('/incident', controller.find);
app.put('/incident/:id', controller.update);
app.delete('/incident/:id', controller.delete);

module.exports = app
