let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let incident= require('../model/model')


router.get('/incident',(req,res,next)=>{
    incident.find((err, incident)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('Incident Report', {
                title: 'Incident',
                incident: incident

            })
        }
    });
});

router.get('/add', (req,res,next)=>{
	res.render('incident/add', {title:'Add Incident'})
});
router.post('/add', (req,res,next)=>{
	let newincident = Incident({
		'name':req.body.name,
		'email':req.body.email,
		'incidentnumber':req.body.incidentnumber,
		'employeeID': req.body.employeeID,
		'location':req.body.location,
		'description': req.body.description,
		'status':req.body.status
        });
	    incident.create(newincident, (err, incident) => {
	    if(err)
        {
		    console.log(err);
		    res.end(err);
	    }
        else
        {
		    res.redirect('/incident');
	    }
	});
});
    router.get('/edit/:id', (req,res,next)=>{
	    let id = req.params.id;

	    incidentdb.findById(id, (err, incidentToEdit))
	    if(err){
		    console.log(err);
		    res.end(err);
	    }
	    else{
		    res.render('incident/edit', {title:'Edit Incident', incident:incidentToEdit});
	    }
    });
    router.post('/edit/:id', (req,res,next)=>{
	let id=req.params.id
	let updateIncident = incident({
		'_id':id,
		'name':req.body.name,
		'email':req.body.email,
		'incidentnumber':req.body.incidentnumber,
		'employeeID': req.body.employeeID,
		'location':req.body.location,
		'description': req.body.description,
		'status':req.body.status
	});
	incident.updateOne({_id:id},updateIncident,(err) =>{
		if(err){
		console.log(err);
		res.end(err);
		}
		else{
			res.redirect('/incident');
		}
	});
});
router.get('/delete/:id', (req,res,next)=>{
	let id = req.params.id;
	incident.deleteOne({_id:id},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
		}
		else{
			res.redirect('/incident');
		}
	});
});

module.exports = router;
