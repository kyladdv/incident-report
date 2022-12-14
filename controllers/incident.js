let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let Incident = require('../model/model');

module.exports.displayIncidents = (req,res,next) => {
    Incident.find((err, incidents)=>{
        if (err) {
            return console.error(err);
        } else {
            res.render('incident-list',{
                title:'Incidents',
                
            })
        }
    })
}
//add
module.exports.displayIncidentAdd = (req,res,next) => {
    res.render('incident-list',{
        title:'Add Incident'
    })
}
module.exports.processIncidentAdd = (req,res,next) => {
    let newIncident = Incident ({
        'name': req.body.name,
        'email': req.body.email,
        'incidentnumber': req.body.incidentnumber,
        'employeeID': req.body.employeeID,
        'location': req.body.location,
        'description': req.body.description,
        'status': req.body.status
    })
    Incident.create(newIncident,(err,Incident) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/')
        }
    })
}
//update
module.exports.displayIncidentEdit = (req,res,next) => {
    let id = req.params.incidentnumber;
    Incident.findById(id, (err,currentIncident) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('update-incident',{
                title:'Update Incident'
            })
        }
    })
}
module.exports.processIncidentEdit = (req,res,next) => {
    let id = req.params.id;
    let updateIncident = Incident({
        '_id': id,
        'name': req.body.name,
        'email': req.body.email,
        'incidentnumber': req.body.incidentnumber,
        'employeeID': req.body.employeeID,
        'description': req.body.description,
        'status': req.body.status,
    });
    Incident.updateOne({_id:id},updateIncident,(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/');
        }
    });
}
//delete
module.exports.incidentDelete = (req,res,next)=> {
    let id =req.params.id;
    Incident.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/');
        }
    });
}